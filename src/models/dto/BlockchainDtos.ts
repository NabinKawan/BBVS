export type InputsDto = {
  command: string;
  optionName: string;
  args: string[];
};

export type MetaDataDto = {
  inputs: InputsDto;
  address: string;
};

export type BlockDto = {
  block_hash: string;
  prev_hash: string;
  timestamp: number;
  tx: MetaDataDto;
};

//   {
//     "block_hash": "6943ee25de4b5edd62df8d28f7f92ce4b72dc0ba9c66ac091dba2f64eb8da854",
//     "prev_hash": "e0ab003bc40e56fe6c7fdb9ce8e940f138a1cc0c7d0a9a9c9c41227d08e2dfed",
//     "timestamp": 1679030046.649037,
//     "tx": {
//         "metadata": {
//             "inputs": "{\"command\": \"do-vote\", \"option_name\": \"--vote\", \"args\": [\"KCE075BCT014\", \"[\\\"BBVS13\\\",\\\"BBVS21\\\",\\\"BBVS18\\\",\\\"BBVS08\\\"]\"]}",
//             "address": "0f3b43f65e01022213a68e82b610a4ef75436c22f273f969b15f28cad7fca935"
//         }
//     }
// }
