# AGENTS.md

このリポジトリの開発手順・アーキテクチャ・取り決めは `CLAUDE.md` にある。作業前に `CLAUDE.md` を読むこと。

- パッケージマネージャーは **pnpm**。
- Nix devShell を前提とする。エージェントのシェルでは `nix develop -c <cmd>` で実行する。
- 変更後は `pnpm verify` を通す。
- CI の必須チェックは `verify`。
