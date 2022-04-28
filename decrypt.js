#!/usr/bin/env node

// Usage: decrypt.js secret.md.encrypted secret.md

import { readFileSync, writeFileSync } from "fs"
import { Keyring } from "@polkadot/keyring"

// Accounts data
const SENDER_ADDRESS = process.env.SENDER_ADDRESS
const RECIPIENT_MNEMONIC = process.env.RECIPIENT_MNEMONIC

// Read content
const filenameSource = process.argv.slice(2)[0]
const filenameDest = process.argv.slice(2)[1]
const contentsEncrypted = readFileSync(filenameSource)

// Setup keyrings
const recipient = new Keyring().addFromMnemonic(RECIPIENT_MNEMONIC)
const sender = new Keyring().addFromAddress(SENDER_ADDRESS)
console.log(
    `Sender: ${JSON.stringify(sender)},\n`+
    `Recipient: ${JSON.stringify(recipient)},\n`+
    `Source encrypted file: ${filenameSource},\n`+
    `Destination for decrypted file: ${filenameDest}.`
)

// Decrypt
const contentsDecrypted = recipient.decryptMessage(contentsEncrypted, sender.publicKey)
writeFileSync(filenameDest, contentsDecrypted)
console.log(`${filenameDest} written.`)
