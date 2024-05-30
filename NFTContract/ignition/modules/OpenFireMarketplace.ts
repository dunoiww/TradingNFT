import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NFTMarketplaceModule = buildModule("NFTMarketplaceModule", (m) => {
  const marketplace = m.contract("FireMarketplace", ["0xba116C19bc8f7BB26c17563457DE20C6101690d2", "0x9c8195e66cE0cB1A49D3Bcd92c8bB897cA9b8f9f"]);

  return { marketplace };
});

module.exports = NFTMarketplaceModule;