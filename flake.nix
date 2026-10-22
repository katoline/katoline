{
  description = "katoline devShell (Astro + pnpm)";

  inputs = {
    nixpkgs.follows = "nodejs-nixpkgs";
    # Node.js 本体と共有ライブラリのセキュリティ修正を含む入力。通常のチャンネル反映を待たない。
    nodejs-nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable-small";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, nodejs-nixpkgs, flake-utils }:
    flake-utils.lib.eachSystem
      [
        "aarch64-darwin"
        "x86_64-darwin"
        "x86_64-linux"
        "aarch64-linux"
      ]
      (system:
        let
          nodejsPkgs = import nodejs-nixpkgs { inherit system; };
          secureNode =
            assert nodejsPkgs.lib.versionAtLeast nodejsPkgs.nodejs_22.version "22.23.4";
            nodejsPkgs.nodejs_22;
          pkgs = import nixpkgs {
            inherit system;
            overlays = [
              (_: prev: {
                nodejs_22 = secureNode;
                pnpm = prev.pnpm.override { nodejs-slim = secureNode; };
              })
            ];
          };
        in
        assert pkgs.lib.versionAtLeast pkgs.openssl.version "3.5.9";
        assert pkgs.lib.versionAtLeast pkgs.cacert.version "3.131.1";
        {
          devShells.default = pkgs.mkShell {
            packages = [
              pkgs.nodejs_22
              pkgs.pnpm
            ];

            shellHook = ''
              echo "katoline devShell: node=$(node --version) pnpm=$(pnpm --version)"
            '';
          };
        }
      );
}
