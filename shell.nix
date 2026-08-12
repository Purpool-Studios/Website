{ pkgs ? import  <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs_20
    corepack # Habilita pnpm/yarn
    gnumake
  ];

  shellHook = ''
    echo "=========================================="
    echo " Visual Game Dev Environment Active (Nix)"
    echo "=========================================="
  '';
}
