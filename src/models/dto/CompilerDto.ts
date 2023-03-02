export interface CommandParamsDto {
  command: string;
  option_name: string;
  args: string[];
}

export interface ExecuteDto {
  contract_address: string;
  command_params: CommandParamsDto;
}
