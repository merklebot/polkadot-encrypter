# Polkadot Encrypter

Asymmetric public key encryption and decryption with Polkadot accounts.

## Usage

1. Setup accounts data in .env (check .env.example)
2. Encrypt files

```console
./encrypt.js secret secret.encrypted
```

3. Decrypt files

```console
./decrypt.js secret.encrypted secret
```