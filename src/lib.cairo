use starknet::get_caller_address;
use starknet::storage::Map;

#[starknet::contract]
mod ShadowNet {
    use starknet::get_caller_address;
    use starknet::storage::Map;

    #[storage]
    struct Storage {
        vault_owner: Map<felt252, felt252>,
        vault_commitment: Map<felt252, felt252>,
    }

    #[external(v0)]
    fn create_vault(
        ref self: ContractState,
        vault_id: felt252,
        commitment: felt252,
    ) {
        let caller = get_caller_address();
        self.vault_owner.write(vault_id, caller.into());
        self.vault_commitment.write(vault_id, commitment);
    }

    #[external(v0)]
    fn get_vault(
        self: @ContractState,
        vault_id: felt252,
    ) -> (felt252, felt252) {
        let owner = self.vault_owner.read(vault_id);
        let commitment = self.vault_commitment.read(vault_id);
        (owner, commitment)
    }
}
