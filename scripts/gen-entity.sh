#!/bin/bash
read -p "Enter the entity name: " name

script_path=$(readlink -f "$0")
current_dir=$(dirname "$script_path")

asset_dir=${current_dir}/assets/example 
output_dir=${current_dir}/../src/core/src/${name}

if [ -d "$output_dir" ]; then
  echo "Folder of the entity already exists"
  read -p "Do you wish to delete the previous folder and create a new entity from scratch? y/n " answer

  if [ "${answer}" == "y" ]; then
    rm -rf "$output_dir"
    echo "Excluding existing folder..."
  else
    echo "Entity generation stopped."
    exit 1
  fi

fi

declare -A props

while true; do
  read -p "Enter the prop name, if optional put a ? as last character. Enter 'q' to save and finish): " prop
  if [[ "$prop" == "q" ]]; then
    break
  fi
  
  read -p "Enter the prop type: " type
  props["$prop"]=$type
done

cp -r ${asset_dir} ${output_dir}

name_lowercase=$(echo "$name" | tr -s '[:upper:]' '[:lower:]')

name_uppercase_first="${name_lowercase^}"

name_upper=$(echo $name | tr '[:lower:]' '[:upper:]')

find ${output_dir} -type f -exec sed -i "s/example/${name_lowercase}/g" {} +
find ${output_dir} -type f -exec sed -i "s/Example/${name_uppercase_first}/g" {} +
find ${output_dir} -type f -exec sed -i "s/EXAMPLE/${name_upper}/g" {} +

find ${output_dir} -depth -name '*example*' -execdir rename "s/example/${name_lowercase}/" {} \;

echo "Generating entity $name..."


for key in "${!props[@]}"
do
  value=${props[$key]}

last_char_of_key=${key: -1}
is_optional=false
parsedKey="$key"

commonFields=("id" "name" "created_at" "updated_at" "status")
if grep -q "$parsedKey" <<<"${commonFields[@]}"; then
  break
fi

if [[ "$last_char_of_key" == "?" ]]; then
  is_optional=true
  parsedKey=${key%?} 
fi

key_uppercase_first="${parsedKey^}"
value_uppercase_first="${value^}"

getter="get $parsedKey(): $value { return this.props.$parsedKey } \n\n"

if [[ $is_optional == true ]]; then
getter="get $parsedKey(): $value { return this.props?.$parsedKey } \n\n"
fi

setter="set $parsedKey (new$key_uppercase_first: $value) { this.props.$parsedKey = new$key_uppercase_first \n this.update() } \n\n"

if [[ $is_optional == true ]]; then
setter="set $parsedKey (new$key_uppercase_first: $value | null) { this.props.$parsedKey = new$key_uppercase_first \n this.update() } \n\n"
fi

find ${output_dir} -type f -exec sed -i "/\/\*getters\*\//a $getter  $setter"  {} \;

model="@classValidator.Is$value_uppercase_first()\n$key: $value;\n\n"

if [[ $is_optional == true ]]; then
model="@classValidator.Is$value_uppercase_first()\n@classValidator.IsOptional()\n$key: $value;\n\n"
fi

find ${output_dir} -type f -exec sed -i "/\/\*models\*\//a $model"  {} \;

randomValue="$parsedKey: "

if [[ "$value" == "string" ]]; then
  randomValue+='`random-${uuid()}`,'
elif [[ "$value" == "number" ]]; then
  randomValue+="Math.floor(Math.random() * 101),"
elif [[ "$value" == "string[]" ]]; then
  randomValue+="[uuid()],"
elif [[ "$value" == "number[]" ]]; then
  randomValue+="[1, 2, 3],"
elif [[ "$value" == "boolean" ]]; then
  randomValue+="Math.random() < 0.5 ? false : true,"
elif [[ "$value" == "Date" ]]; then
  randomValue+="new Date(),"
fi

find ${output_dir} -type f -exec sed -i "/\/\*random\*\//a $randomValue"  {} \;


mongoschema=""

if [[ "$value" == "string" ]]; then
  if [[ $is_optional == true ]]; then
  mongoschema="$parsedKey: { type: String, required: false },"
  else
  mongoschema="$parsedKey: { type: String, required: true },"
  fi
elif [[ "$value" == "number" ]]; then
  if [[ $is_optional == true ]]; then
  mongoschema="$parsedKey: { type: Number, required: false },"
  else
  mongoschema="$parsedKey: { type: Number, required: true },"
  fi
elif [[ "$value" == "string[]" ]]; then
  if [[ $is_optional == true ]]; then
  mongoschema="$parsedKey: { type: [String], required: false },"
  else
  mongoschema="$parsedKey: { type: [String], required: true },"
  fi
elif [[ "$value" == "number[]" ]]; then
  if [[ $is_optional == true ]]; then
  mongoschema="$parsedKey: { type: [Number], required: false },"
  else
  mongoschema="$parsedKey: { type: [Number], required: true },"
  fi
elif [[ "$value" == "boolean" ]]; then
  if [[ $is_optional == true ]]; then
  mongoschema="$parsedKey: { type: Boolean, required: false },"
  else
  mongoschema="$parsedKey: { type: Boolean, required: true },"
  fi
elif [[ "$value" == "Date" ]]; then
  if [[ $is_optional == true ]]; then
  mongoschema="$parsedKey: { type: Date, required: false },"
  else
  mongoschema="$parsedKey: { type: Date, required: true },"
  fi
fi

find ${output_dir} -type f -exec sed -i "/\/\*mongoschema\*\//a $mongoschema"  {} \;

toentityprops="$parsedKey: model.$parsedKey,"

find ${output_dir} -type f -exec sed -i "/\/\*toentityprops\*\//a $toentityprops"  {} \;


done

echo "The files for the entity $name was successfuly created, now the files are being indented by prettier, build, and tested"

find ${output_dir} -type f -exec sed -i "/\/\*getters\*\//d"  {} \;
find ${output_dir} -type f -exec sed -i "/\/\*models\*\//d"  {} \;
find ${output_dir} -type f -exec sed -i "/\/\*random\*\//d"  {} \;
find ${output_dir} -type f -exec sed -i "/\/\*mongoschema\*\//d"  {} \;
find ${output_dir} -type f -exec sed -i "/\/\*toentityprops\*\//d"  {} \;

cd ${current_dir}/../

pnpm core:build --output-logs=none

cd ${current_dir}/../src/core

pnpm jest --testPathPattern=$name


echo "The file generator has stopped it process."
