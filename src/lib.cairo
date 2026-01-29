use starknet::storage::Map;
use starknet::get_caller_address;

#[starknet::contract]
mod ShadowNet {

    #[storage]
    struct Storage {
        vault_owner: Map<felt252, felt252>,
        vault_commitment: Map<felt252, felt252>,
    }

    // -----------------------
    // Create a vault
    // -----------------------
    #[external(v0)]
    fn create_vault(
        ref self: ContractState,
        vault_id: felt252,
        commitment: felt252,
    ) {
        let caller = get_caller_address();
        self.vault_owner.entry(vault_id).write(caller);
        self.vault_commitment.entry(vault_id).write(commitment);
    }

    // -----------------------
    // Get vault info
    // -----------------------
    #[external(v0)]
    fn get_vault(
        self: @ContractState,
        vault_id: felt252,
    ) -> (felt252, felt252) {
        let owner = self.vault_owner.entry(vault_id).read();
        let commitment = self.vault_commitment.entry(vault_id).read();
        (owner, commitment)
    }
}
