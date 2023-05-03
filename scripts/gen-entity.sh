#!/bin/bash
read -p "Enter the entity name: " name

declare -A props

while true; do
  read -p "Enter the prop name, if optional put a ? as last characters (or send 'q' to finish): " prop
  if [[ "$prop" == "q" ]]; then
    break
  fi
  
  read -p "Enter the prop type: " type
  props["$prop"]=$type
done

script_path=$(readlink -f "$0")
current_dir=$(dirname "$script_path")

asset_dir=${current_dir}/assets/example 
output_dir=${current_dir}/../src/core/src/${name}

cp -r ${asset_dir} ${output_dir}

name_lowercase=$(echo "$name" | tr -s '[:upper:]' '[:lower:]')

name_uppercase_first="${name_lowercase^}"

name_upper=$(echo $name | tr '[:lower:]' '[:upper:]')

find ${output_dir} -type f -exec sed -i "s/example/${name_lowercase}/g" {} +
find ${output_dir} -type f -exec sed -i "s/Example/${name_uppercase_first}/g" {} +
find ${output_dir} -type f -exec sed -i "s/EXAMPLE/${name_upper}/g" {} +

find ${output_dir} -depth -name '*example*' -execdir rename "s/example/${name_lowercase}/" {} \;

for key in "${!props[@]}"
do
  value=${props[$key]}

last_char_of_key=${key: -1}
is_optional=false
parsedKey="$key"

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

changer="change$key_uppercase_first (new$key_uppercase_first: $value): void { this.props.$parsedKey = new$key_uppercase_first \n this.update() } \n\n"

if [[ $is_optional == true ]]; then
changer="change$key_uppercase_first (new$key_uppercase_first: $value | null): void { this.props.$parsedKey = new$key_uppercase_first \n this.update() } \n\n"
fi

find ${output_dir} -type f -exec sed -i "/\/\*getters\*\//a $getter  $changer"  {} \;

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

find ${output_dir} -type f -exec sed -i "/\/\*getters\*\//d"  {} \;
find ${output_dir} -type f -exec sed -i "/\/\*models\*\//d"  {} \;
find ${output_dir} -type f -exec sed -i "/\/\*random\*\//d"  {} \;
find ${output_dir} -type f -exec sed -i "/\/\*mongoschema\*\//d"  {} \;
find ${output_dir} -type f -exec sed -i "/\/\*toentityprops\*\//d"  {} \;
