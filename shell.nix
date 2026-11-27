{ pkgs ? import  <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs_20
    corepack # Habilita pnpm/yarn
    gnumake
  ];

  shellHook = ''
    echo "=========================================="
    echo "        Environment Active (Nix)"
    echo "=========================================="
  '';
}
