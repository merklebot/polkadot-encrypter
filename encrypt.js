#!/usr/bin/env node

// Usage: encrypt.js secret.md secret.md.encrypted

import { readFileSync, writeFileSync } from "fs"
import { Keyring } from "@polkadot/keyring"

// Accounts data
const SENDER_MNEMONIC = process.env.SENDER_MNEMONIC
const RECIPIENT_ADDRESS = process.env.RECIPIENT_ADDRESS

// Read content
const filenameSource = process.argv.slice(2)[0]
const filenameDest = process.argv.slice(2)[1]
const contentsRaw = readFileSync(filenameSource)

// Setup keyrings
const sender = new Keyring().addFromMnemonic(SENDER_MNEMONIC)
const recipient = new Keyring().addFromAddress(RECIPIENT_ADDRESS)
console.log(
    `Sender: ${JSON.stringify(sender)},\n`+
    `Recipient: ${JSON.stringify(recipient)},\n`+
    `Source raw file: ${filenameSource},\n`+
    `Destination for encrypted file: ${filenameDest}.`
)

// Encrypt
const contentsEncrypted = sender.encryptMessage(contentsRaw, recipient.publicKey)
writeFileSync(filenameDest, contentsEncrypted)
console.log(`${filenameDest} written.`)
