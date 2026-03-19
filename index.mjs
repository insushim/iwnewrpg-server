// server/index.ts
import http from "node:http";
import express from "express";

// src/game/data/items.ts
var ITEMS = {
  trainee_dagger: {
    id: "trainee_dagger",
    name: "\uC218\uB828\uC0DD\uC758 \uB2E8\uAC80",
    type: "weapon" /* WEAPON */,
    subtype: "dagger" /* DAGGER */,
    rarity: "common" /* COMMON */,
    stats: { minAttack: 2, maxAttack: 4 },
    requirements: { level: 1 },
    weight: 5,
    stackable: false,
    description: "\uCD08\uBCF4 \uBAA8\uD5D8\uAC00\uC5D0\uAC8C \uC9C0\uAE09\uB418\uB294 \uAE30\uBCF8 \uB2E8\uAC80\uC785\uB2C8\uB2E4.",
    icon: "weapon_dagger_common",
    price: 50
  },
  iron_sword: {
    id: "iron_sword",
    name: "\uCCA0\uAC80",
    type: "weapon" /* WEAPON */,
    subtype: "oneHandSword" /* ONE_HAND_SWORD */,
    rarity: "common" /* COMMON */,
    stats: { minAttack: 4, maxAttack: 10 },
    requirements: { level: 5, classes: ["guardian" /* GUARDIAN */, "sovereign" /* SOVEREIGN */] },
    weight: 15,
    stackable: false,
    description: "\uAE30\uBCF8\uAE30\uC5D0 \uCDA9\uC2E4\uD55C \uAC80\uC785\uB2C8\uB2E4.",
    icon: "weapon_sword_common",
    price: 200
  },
  mithril_longsword: {
    id: "mithril_longsword",
    name: "\uBBF8\uC2A4\uB9B4 \uC7A5\uAC80",
    type: "weapon" /* WEAPON */,
    subtype: "oneHandSword" /* ONE_HAND_SWORD */,
    rarity: "uncommon" /* UNCOMMON */,
    stats: { minAttack: 8, maxAttack: 16 },
    requirements: { level: 15, classes: ["guardian" /* GUARDIAN */, "sovereign" /* SOVEREIGN */] },
    weight: 20,
    stackable: false,
    description: "\uAC00\uBCCD\uACE0 \uB0A0\uCE74\uB85C\uC6B4 \uBBF8\uC2A4\uB9B4 \uC7A5\uAC80\uC785\uB2C8\uB2E4.",
    icon: "weapon_sword_uncommon",
    price: 1200
  },
  hunter_bow: {
    id: "hunter_bow",
    name: "\uC0AC\uB0E5\uAFBC\uC758 \uD65C",
    type: "weapon" /* WEAPON */,
    subtype: "bow" /* BOW */,
    rarity: "common" /* COMMON */,
    stats: { minAttack: 2, maxAttack: 2, rangedDamage: 1 },
    requirements: { level: 1, classes: ["ranger" /* RANGER */] },
    weight: 6,
    stackable: false,
    description: "\uB808\uC778\uC800 \uCD08\uBC18 \uC721\uC131\uC5D0 \uC801\uD569\uD55C \uD65C\uC785\uB2C8\uB2E4.",
    icon: "weapon_bow_common",
    price: 80
  },
  arcana_staff: {
    id: "arcana_staff",
    name: "\uC544\uB974\uCE74\uB098 \uC2A4\uD0DC\uD504",
    type: "weapon" /* WEAPON */,
    subtype: "staff" /* STAFF */,
    rarity: "rare" /* RARE */,
    stats: { minAttack: 6, maxAttack: 10, spellPower: 3, mp: 30 },
    requirements: { level: 30, classes: ["arcanist" /* ARCANIST */] },
    weight: 12,
    stackable: false,
    description: "\uBE44\uC804\uC220\uC758 \uC99D\uD3ED\uC744 \uB3C4\uC640 \uC8FC\uB294 \uB9C8\uB3C4\uAD6C\uC785\uB2C8\uB2E4.",
    icon: "weapon_staff_rare",
    price: 4e3
  },
  leather_cap: {
    id: "leather_cap",
    name: "\uAC00\uC8FD \uBAA8\uC790",
    type: "armor" /* ARMOR */,
    subtype: "helmet" /* HELMET */,
    rarity: "common" /* COMMON */,
    stats: { ac: -1 },
    requirements: { level: 1 },
    weight: 5,
    stackable: false,
    description: "\uCD08\uBCF4\uC790\uC6A9 \uAC00\uC8FD \uBAA8\uC790\uC785\uB2C8\uB2E4.",
    icon: "armor_helmet_common",
    price: 40
  },
  chain_mail: {
    id: "chain_mail",
    name: "\uCCB4\uC778 \uBA54\uC77C",
    type: "armor" /* ARMOR */,
    subtype: "armor" /* ARMOR */,
    rarity: "common" /* COMMON */,
    stats: { ac: -4 },
    requirements: { level: 10, classes: ["guardian" /* GUARDIAN */, "sovereign" /* SOVEREIGN */] },
    weight: 30,
    stackable: false,
    description: "\uAE08\uC18D \uACE0\uB9AC\uB85C \uC5EE\uC5B4 \uB9CC\uB4E0 \uC2E4\uC804 \uAC11\uC637\uC785\uB2C8\uB2E4.",
    icon: "armor_chest_common",
    price: 450
  },
  ranger_leather: {
    id: "ranger_leather",
    name: "\uB808\uC778\uC800 \uAC00\uC8FD\uAC11\uC637",
    type: "armor" /* ARMOR */,
    subtype: "armor" /* ARMOR */,
    rarity: "uncommon" /* UNCOMMON */,
    stats: { ac: -4 },
    requirements: { level: 15, classes: ["ranger" /* RANGER */] },
    weight: 20,
    stackable: false,
    description: "\uBBFC\uCCA9\uD55C \uC6C0\uC9C1\uC784\uC5D0 \uB9DE\uCD98 \uACBD\uB7C9 \uAC00\uC8FD\uAC11\uC637\uC785\uB2C8\uB2E4.",
    icon: "armor_chest_uncommon",
    price: 850
  },
  mage_robe: {
    id: "mage_robe",
    name: "\uB9C8\uBC95\uC0AC \uB85C\uBE0C",
    type: "armor" /* ARMOR */,
    subtype: "armor" /* ARMOR */,
    rarity: "uncommon" /* UNCOMMON */,
    stats: { ac: -3, mp: 20 },
    requirements: { level: 15, classes: ["arcanist" /* ARCANIST */] },
    weight: 12,
    stackable: false,
    description: "\uB9C8\uB825\uC744 \uC21C\uD658\uC2DC\uD0A4\uB294 \uB370 \uC720\uB9AC\uD55C \uB85C\uBE0C\uC785\uB2C8\uB2E4.",
    icon: "armor_robe_uncommon",
    price: 900
  },
  guardian_ring: {
    id: "guardian_ring",
    name: "\uC218\uD638\uC758 \uBC18\uC9C0",
    type: "armor" /* ARMOR */,
    subtype: "ring" /* RING */,
    rarity: "uncommon" /* UNCOMMON */,
    stats: { ac: -1, hp: 5 },
    requirements: { level: 1 },
    weight: 1,
    stackable: false,
    description: "\uAE30\uBCF8 \uBC29\uC5B4\uB825\uACFC \uC0DD\uBA85\uB825\uC744 \uC62C\uB824 \uC8FC\uB294 \uBC18\uC9C0\uC785\uB2C8\uB2E4.",
    icon: "ring_uncommon",
    price: 300
  },
  red_potion: {
    id: "red_potion",
    name: "\uBD89\uC740 \uBB3C\uC57D",
    type: "consumable" /* CONSUMABLE */,
    rarity: "common" /* COMMON */,
    stats: { hp: 15 },
    weight: 2,
    stackable: true,
    description: "\uC989\uC2DC HP\uB97C 15 \uD68C\uBCF5\uD569\uB2C8\uB2E4.",
    icon: "potion_red",
    price: 10,
    maxStack: 100
  },
  blue_potion: {
    id: "blue_potion",
    name: "\uD478\uB978 \uBB3C\uC57D",
    type: "consumable" /* CONSUMABLE */,
    rarity: "common" /* COMMON */,
    stats: { mp: 30 },
    weight: 2,
    stackable: true,
    description: "\uC989\uC2DC MP\uB97C 30 \uD68C\uBCF5\uD569\uB2C8\uB2E4.",
    icon: "potion_blue",
    price: 50,
    maxStack: 100
  },
  haste_potion: {
    id: "haste_potion",
    name: "\uCD08\uB85D \uBB3C\uC57D",
    type: "consumable" /* CONSUMABLE */,
    rarity: "uncommon" /* UNCOMMON */,
    stats: { attackSpeedTier: 1, moveSpeedPercent: 20 },
    weight: 2,
    stackable: true,
    description: "\uC77C\uC2DC\uC801\uC73C\uB85C \uC774\uB3D9 \uC18D\uB3C4\uC640 \uACF5\uACA9 \uC18D\uB3C4\uB97C \uC62C\uB9BD\uB2C8\uB2E4.",
    icon: "potion_green",
    price: 150,
    maxStack: 100
  },
  teleport_scroll: {
    id: "teleport_scroll",
    name: "\uC21C\uAC04\uC774\uB3D9 \uC8FC\uBB38\uC11C",
    type: "scroll" /* SCROLL */,
    rarity: "common" /* COMMON */,
    stats: {},
    weight: 1,
    stackable: true,
    description: "\uADFC\uCC98\uC758 \uB2E4\uB978 \uC704\uCE58\uB85C \uC21C\uAC04\uC774\uB3D9\uD569\uB2C8\uB2E4.",
    icon: "scroll_teleport",
    price: 50,
    maxStack: 100
  },
  return_scroll: {
    id: "return_scroll",
    name: "\uADC0\uD658 \uC8FC\uBB38\uC11C",
    type: "scroll" /* SCROLL */,
    rarity: "uncommon" /* UNCOMMON */,
    stats: {},
    weight: 1,
    stackable: true,
    description: "\uAC00\uC7A5 \uAC00\uAE4C\uC6B4 \uB9C8\uC744\uB85C \uC989\uC2DC \uADC0\uD658\uD569\uB2C8\uB2E4.",
    icon: "scroll_return",
    price: 100,
    maxStack: 100
  },
  weapon_enchant_scroll: {
    id: "weapon_enchant_scroll",
    name: "\uBB34\uAE30 \uAC15\uD654 \uC8FC\uBB38\uC11C",
    type: "scroll" /* SCROLL */,
    rarity: "rare" /* RARE */,
    stats: {},
    weight: 1,
    stackable: true,
    description: "\uBB34\uAE30 \uAC15\uD654 \uC2DC\uB3C4\uC5D0 \uC0AC\uC6A9\uD558\uB294 \uC8FC\uBB38\uC11C\uC785\uB2C8\uB2E4.",
    icon: "scroll_weapon_enchant",
    price: 2e3,
    maxStack: 20
  },
  animal_hide: {
    id: "animal_hide",
    name: "\uB3D9\uBB3C \uAC00\uC8FD",
    type: "material" /* MATERIAL */,
    rarity: "common" /* COMMON */,
    stats: {},
    weight: 1,
    stackable: true,
    description: "\uAE30\uCD08 \uBC29\uC5B4\uAD6C \uC81C\uC791\uC5D0 \uC4F0\uC774\uB294 \uC7AC\uB8CC\uC785\uB2C8\uB2E4.",
    icon: "material_hide",
    price: 8,
    maxStack: 999
  },
  training_arrow: {
    id: "training_arrow",
    name: "\uD6C8\uB828\uC6A9 \uD654\uC0B4",
    type: "material" /* MATERIAL */,
    rarity: "common" /* COMMON */,
    stats: {},
    weight: 1,
    stackable: true,
    description: "\uAE30\uBCF8 \uD65C \uACF5\uACA9\uC5D0 \uC0AC\uC6A9\uD558\uB294 \uD654\uC0B4\uC785\uB2C8\uB2E4.",
    icon: "ammo_arrow_common",
    price: 2,
    maxStack: 999
  },
  mithril_ore: {
    id: "mithril_ore",
    name: "\uBBF8\uC2A4\uB9B4 \uAD11\uC11D",
    type: "material" /* MATERIAL */,
    rarity: "uncommon" /* UNCOMMON */,
    stats: {},
    weight: 1,
    stackable: true,
    description: "\uACE0\uAE09 \uC7A5\uBE44 \uC81C\uC791\uC5D0 \uD544\uC694\uD55C \uAE08\uC18D \uAD11\uC11D\uC785\uB2C8\uB2E4.",
    icon: "material_mithril",
    price: 120,
    maxStack: 999
  },
  magic_crystal: {
    id: "magic_crystal",
    name: "\uB9C8\uB825 \uACB0\uC815",
    type: "material" /* MATERIAL */,
    rarity: "rare" /* RARE */,
    stats: {},
    weight: 1,
    stackable: true,
    description: "\uB9C8\uBC95 \uC7A5\uBE44\uC640 \uC8FC\uBB38 \uC81C\uC791\uC5D0 \uC0AC\uC6A9\uB429\uB2C8\uB2E4.",
    icon: "material_crystal",
    price: 250,
    maxStack: 999
  },
  // ═══ EPIC WEAPONS ═══
  dark_elven_dagger: {
    id: "dark_elven_dagger",
    name: "\uB2E4\uD06C\uC5D8\uD504 \uB2E8\uAC80",
    type: "weapon" /* WEAPON */,
    subtype: "dagger" /* DAGGER */,
    rarity: "epic" /* EPIC */,
    stats: { minAttack: 12, maxAttack: 20, critRate: 0.05 },
    requirements: { level: 25 },
    weight: 8,
    stackable: false,
    description: "\uC5B4\uB460\uC758 \uC5D8\uD504\uAC00 \uC0AC\uC6A9\uD558\uB358 \uC800\uC8FC\uBC1B\uC740 \uB2E8\uAC80. \uCE58\uBA85\uD0C0 \uD655\uB960\uC774 \uB192\uB2E4.",
    icon: "weapon_dagger_epic",
    price: 8e3
  },
  dragon_slayer_sword: {
    id: "dragon_slayer_sword",
    name: "\uC6A9\uC0B4\uC758 \uB300\uAC80",
    type: "weapon" /* WEAPON */,
    subtype: "twoHandSword" /* TWO_HAND_SWORD */,
    rarity: "epic" /* EPIC */,
    stats: { minAttack: 22, maxAttack: 38, hp: 20 },
    requirements: { level: 35, classes: ["guardian" /* GUARDIAN */, "sovereign" /* SOVEREIGN */] },
    weight: 35,
    stackable: false,
    description: "\uB4DC\uB798\uACE4\uC758 \uBE44\uB298\uB85C \uB2E8\uC870\uB41C \uAC70\uB300\uD55C \uC591\uC190\uAC80\uC785\uB2C8\uB2E4.",
    icon: "weapon_greatsword_epic",
    price: 15e3
  },
  phantom_bow: {
    id: "phantom_bow",
    name: "\uD658\uC601\uC758 \uD65C",
    type: "weapon" /* WEAPON */,
    subtype: "bow" /* BOW */,
    rarity: "epic" /* EPIC */,
    stats: { minAttack: 10, maxAttack: 18, rangedDamage: 5, critRate: 0.08 },
    requirements: { level: 30, classes: ["ranger" /* RANGER */] },
    weight: 10,
    stackable: false,
    description: "\uD658\uC601\uC744 \uB6AB\uACE0 \uB0A0\uC544\uAC00\uB294 \uC2E0\uBE44\uD55C \uD65C\uC785\uB2C8\uB2E4.",
    icon: "weapon_bow_epic",
    price: 12e3
  },
  void_staff: {
    id: "void_staff",
    name: "\uACF5\uD5C8\uC758 \uC9C0\uD321\uC774",
    type: "weapon" /* WEAPON */,
    subtype: "staff" /* STAFF */,
    rarity: "epic" /* EPIC */,
    stats: { minAttack: 8, maxAttack: 14, spellPower: 12, mp: 80 },
    requirements: { level: 30, classes: ["arcanist" /* ARCANIST */] },
    weight: 14,
    stackable: false,
    description: "\uACF5\uD5C8\uC5D0\uC11C \uAEBC\uB0B4\uC628 \uB9C8\uB825\uC774 \uAE43\uB4E0 \uC9C0\uD321\uC774\uC785\uB2C8\uB2E4.",
    icon: "weapon_staff_epic",
    price: 13e3
  },
  // ═══ LEGENDARY WEAPONS ═══
  eternal_blade: {
    id: "eternal_blade",
    name: "\uC601\uC6D0\uC758 \uAC80",
    type: "weapon" /* WEAPON */,
    subtype: "oneHandSword" /* ONE_HAND_SWORD */,
    rarity: "legendary" /* LEGENDARY */,
    stats: { minAttack: 30, maxAttack: 50, critRate: 0.1, hp: 30 },
    requirements: { level: 45, classes: ["guardian" /* GUARDIAN */, "sovereign" /* SOVEREIGN */] },
    weight: 25,
    stackable: false,
    description: "\uC2E0\uD654 \uC18D \uC601\uC6C5\uC774 \uC0AC\uC6A9\uD55C \uBD88\uBA78\uC758 \uAC80\uC785\uB2C8\uB2E4.",
    icon: "weapon_sword_legendary",
    price: 5e4,
    tags: ["set:eternal"]
  },
  eternal_staff: {
    id: "eternal_staff",
    name: "\uC601\uC6D0\uC758 \uC9C0\uD321\uC774",
    type: "weapon" /* WEAPON */,
    subtype: "staff" /* STAFF */,
    rarity: "legendary" /* LEGENDARY */,
    stats: { minAttack: 15, maxAttack: 25, spellPower: 25, mp: 150, critRate: 0.08 },
    requirements: { level: 45, classes: ["arcanist" /* ARCANIST */] },
    weight: 18,
    stackable: false,
    description: "\uC138\uC0C1 \uBAA8\uB4E0 \uB9C8\uB825\uC744 \uB2F4\uC740 \uC804\uC124\uC758 \uC9C0\uD321\uC774\uC785\uB2C8\uB2E4.",
    icon: "weapon_staff_legendary",
    price: 5e4,
    tags: ["set:eternal"]
  },
  // ═══ EPIC ARMOR ═══
  dragon_scale_armor: {
    id: "dragon_scale_armor",
    name: "\uC6A9\uBE44\uB298 \uAC11\uC637",
    type: "armor" /* ARMOR */,
    subtype: "armor" /* ARMOR */,
    rarity: "epic" /* EPIC */,
    stats: { ac: -10, hp: 50, magicResistance: 5 },
    requirements: { level: 35, classes: ["guardian" /* GUARDIAN */, "sovereign" /* SOVEREIGN */] },
    weight: 45,
    stackable: false,
    description: "\uB808\uB4DC \uB4DC\uB798\uACE4\uC758 \uBE44\uB298\uB85C \uB9CC\uB4E0 \uCD08\uACE0\uAC15\uB3C4 \uAC11\uC637\uC785\uB2C8\uB2E4.",
    icon: "armor_chest_epic",
    price: 18e3,
    tags: ["set:dragon"]
  },
  shadow_cloak: {
    id: "shadow_cloak",
    name: "\uADF8\uB9BC\uC790\uC758 \uB9DD\uD1A0",
    type: "armor" /* ARMOR */,
    subtype: "cloak" /* CLOAK */,
    rarity: "epic" /* EPIC */,
    stats: { ac: -4, moveSpeedPercent: 10, critRate: 0.05 },
    requirements: { level: 25 },
    weight: 8,
    stackable: false,
    description: "\uC5B4\uB460 \uC18D\uC5D0\uC11C \uC874\uC7AC\uB97C \uAC10\uCD94\uB294 \uC2E0\uBE44\uD55C \uB9DD\uD1A0\uC785\uB2C8\uB2E4.",
    icon: "armor_cloak_epic",
    price: 7e3
  },
  mithril_boots: {
    id: "mithril_boots",
    name: "\uBBF8\uC2A4\uB9B4 \uBD80\uCE20",
    type: "armor" /* ARMOR */,
    subtype: "boots" /* BOOTS */,
    rarity: "uncommon" /* UNCOMMON */,
    stats: { ac: -2, moveSpeedPercent: 8 },
    requirements: { level: 15 },
    weight: 10,
    stackable: false,
    description: "\uAC00\uBCCD\uACE0 \uD2BC\uD2BC\uD55C \uBBF8\uC2A4\uB9B4 \uBD80\uCE20\uC785\uB2C8\uB2E4.",
    icon: "armor_boots_uncommon",
    price: 1500
  },
  // ═══ LEGENDARY ARMOR SET ═══
  eternal_armor: {
    id: "eternal_armor",
    name: "\uC601\uC6D0\uC758 \uAC11\uC637",
    type: "armor" /* ARMOR */,
    subtype: "armor" /* ARMOR */,
    rarity: "legendary" /* LEGENDARY */,
    stats: { ac: -14, hp: 100, magicResistance: 10 },
    requirements: { level: 45 },
    weight: 50,
    stackable: false,
    description: "\uC804\uC124 \uC18D \uBD88\uC0AC\uC2E0\uC774 \uCC29\uC6A9\uD55C \uAC11\uC637\uC785\uB2C8\uB2E4.",
    icon: "armor_chest_legendary",
    price: 6e4,
    tags: ["set:eternal"]
  },
  eternal_helmet: {
    id: "eternal_helmet",
    name: "\uC601\uC6D0\uC758 \uD22C\uAD6C",
    type: "armor" /* ARMOR */,
    subtype: "helmet" /* HELMET */,
    rarity: "legendary" /* LEGENDARY */,
    stats: { ac: -6, hp: 50, mp: 30 },
    requirements: { level: 45 },
    weight: 20,
    stackable: false,
    description: "\uC804\uC124 \uC18D \uBD88\uC0AC\uC2E0\uC774 \uCC29\uC6A9\uD55C \uD22C\uAD6C\uC785\uB2C8\uB2E4.",
    icon: "armor_helmet_legendary",
    price: 4e4,
    tags: ["set:eternal"]
  },
  // ═══ MORE ARMOR ═══
  iron_shield: {
    id: "iron_shield",
    name: "\uCCA0\uC81C \uBC29\uD328",
    type: "armor" /* ARMOR */,
    subtype: "shield" /* SHIELD */,
    rarity: "common" /* COMMON */,
    stats: { ac: -3 },
    requirements: { level: 5, classes: ["guardian" /* GUARDIAN */, "sovereign" /* SOVEREIGN */] },
    weight: 20,
    stackable: false,
    description: "\uAE30\uBCF8\uC801\uC778 \uCCA0\uC81C \uBC29\uD328\uC785\uB2C8\uB2E4.",
    icon: "armor_shield_common",
    price: 300
  },
  mithril_shield: {
    id: "mithril_shield",
    name: "\uBBF8\uC2A4\uB9B4 \uBC29\uD328",
    type: "armor" /* ARMOR */,
    subtype: "shield" /* SHIELD */,
    rarity: "uncommon" /* UNCOMMON */,
    stats: { ac: -5, magicResistance: 3 },
    requirements: { level: 20, classes: ["guardian" /* GUARDIAN */, "sovereign" /* SOVEREIGN */] },
    weight: 22,
    stackable: false,
    description: "\uB9C8\uBC95 \uC800\uD56D\uB825\uC774 \uC788\uB294 \uBBF8\uC2A4\uB9B4 \uBC29\uD328\uC785\uB2C8\uB2E4.",
    icon: "armor_shield_uncommon",
    price: 3e3
  },
  power_amulet: {
    id: "power_amulet",
    name: "\uD798\uC758 \uBAA9\uAC78\uC774",
    type: "armor" /* ARMOR */,
    subtype: "amulet" /* AMULET */,
    rarity: "rare" /* RARE */,
    stats: { hp: 30, critRate: 0.03 },
    requirements: { level: 20 },
    weight: 1,
    stackable: false,
    description: "\uCC29\uC6A9\uC790\uC758 \uD798\uC744 \uAC15\uD654\uD558\uB294 \uBAA9\uAC78\uC774\uC785\uB2C8\uB2E4.",
    icon: "amulet_rare",
    price: 5e3
  },
  speed_belt: {
    id: "speed_belt",
    name: "\uC2E0\uC18D\uC758 \uD5C8\uB9AC\uB760",
    type: "armor" /* ARMOR */,
    subtype: "belt" /* BELT */,
    rarity: "uncommon" /* UNCOMMON */,
    stats: { moveSpeedPercent: 10, ac: -1 },
    requirements: { level: 15 },
    weight: 3,
    stackable: false,
    description: "\uBE60\uB978 \uC774\uB3D9\uC744 \uB3C4\uC640\uC8FC\uB294 \uD5C8\uB9AC\uB760\uC785\uB2C8\uB2E4.",
    icon: "belt_uncommon",
    price: 2e3
  },
  // ═══ CONSUMABLES ═══
  elixir_hp: {
    id: "elixir_hp",
    name: "\uACE0\uAE09 HP \uD68C\uBCF5\uC57D",
    type: "consumable" /* CONSUMABLE */,
    rarity: "uncommon" /* UNCOMMON */,
    stats: { hp: 80 },
    weight: 2,
    stackable: true,
    description: "\uC989\uC2DC HP\uB97C 80 \uD68C\uBCF5\uD569\uB2C8\uB2E4.",
    icon: "potion_hp_uncommon",
    price: 120,
    maxStack: 100
  },
  elixir_mp: {
    id: "elixir_mp",
    name: "\uACE0\uAE09 MP \uD68C\uBCF5\uC57D",
    type: "consumable" /* CONSUMABLE */,
    rarity: "uncommon" /* UNCOMMON */,
    stats: { mp: 100 },
    weight: 2,
    stackable: true,
    description: "\uC989\uC2DC MP\uB97C 100 \uD68C\uBCF5\uD569\uB2C8\uB2E4.",
    icon: "potion_mp_uncommon",
    price: 200,
    maxStack: 100
  },
  full_restore: {
    id: "full_restore",
    name: "\uC644\uC804 \uD68C\uBCF5\uC57D",
    type: "consumable" /* CONSUMABLE */,
    rarity: "rare" /* RARE */,
    stats: { hp: 999, mp: 999 },
    weight: 3,
    stackable: true,
    description: "HP\uC640 MP\uB97C \uBAA8\uB450 \uC644\uC804\uD788 \uD68C\uBCF5\uD569\uB2C8\uB2E4.",
    icon: "potion_full_rare",
    price: 1e3,
    maxStack: 20
  },
  exp_potion: {
    id: "exp_potion",
    name: "\uACBD\uD5D8\uCE58 \uBB3C\uC57D",
    type: "consumable" /* CONSUMABLE */,
    rarity: "rare" /* RARE */,
    stats: {},
    weight: 1,
    stackable: true,
    description: "30\uCD08\uAC04 \uACBD\uD5D8\uCE58 \uD68D\uB4DD\uB7C9\uC774 50% \uC99D\uAC00\uD569\uB2C8\uB2E4.",
    icon: "potion_exp",
    price: 2e3,
    maxStack: 10,
    tags: ["exp_boost_50_30s"]
  },
  // ═══ SCROLLS ═══
  armor_enchant_scroll: {
    id: "armor_enchant_scroll",
    name: "\uBC29\uC5B4\uAD6C \uAC15\uD654 \uC8FC\uBB38\uC11C",
    type: "scroll" /* SCROLL */,
    rarity: "rare" /* RARE */,
    stats: {},
    weight: 1,
    stackable: true,
    description: "\uBC29\uC5B4\uAD6C \uAC15\uD654\uC5D0 \uC0AC\uC6A9\uD558\uB294 \uC8FC\uBB38\uC11C\uC785\uB2C8\uB2E4.",
    icon: "scroll_armor_enchant",
    price: 1500,
    maxStack: 20
  },
  blessing_scroll: {
    id: "blessing_scroll",
    name: "\uBE14\uB808\uC2F1 \uC8FC\uBB38\uC11C",
    type: "scroll" /* SCROLL */,
    rarity: "epic" /* EPIC */,
    stats: {},
    weight: 1,
    stackable: true,
    description: "\uAC15\uD654 \uC2E4\uD328 \uC2DC \uC544\uC774\uD15C \uD30C\uAD34\uB97C \uBC29\uC9C0\uD569\uB2C8\uB2E4.",
    icon: "scroll_blessing",
    price: 8e3,
    maxStack: 10,
    tags: ["blessed"]
  },
  // ═══ MATERIALS ═══
  dragon_bone: {
    id: "dragon_bone",
    name: "\uB4DC\uB798\uACE4 \uBF08",
    type: "material" /* MATERIAL */,
    rarity: "epic" /* EPIC */,
    stats: {},
    weight: 5,
    stackable: true,
    description: "\uC804\uC124\uAE09 \uC7A5\uBE44 \uC81C\uC791\uC5D0 \uD544\uC694\uD55C \uADC0\uC911\uD55C \uC7AC\uB8CC\uC785\uB2C8\uB2E4.",
    icon: "material_dragon_bone",
    price: 3e3,
    maxStack: 99
  },
  shadow_essence: {
    id: "shadow_essence",
    name: "\uADF8\uB9BC\uC790 \uC815\uC218",
    type: "material" /* MATERIAL */,
    rarity: "rare" /* RARE */,
    stats: {},
    weight: 1,
    stackable: true,
    description: "\uC5B4\uB460\uC758 \uC5D0\uB108\uC9C0\uAC00 \uACB0\uC9D1\uB41C \uD76C\uADC0 \uC7AC\uB8CC\uC785\uB2C8\uB2E4.",
    icon: "material_shadow",
    price: 800,
    maxStack: 99
  },
  // ═══ RANDOM / GACHA BOXES ═══
  mystery_box: {
    id: "mystery_box",
    name: "\uBBF8\uC2A4\uD130\uB9AC \uC0C1\uC790",
    type: "consumable" /* CONSUMABLE */,
    rarity: "rare" /* RARE */,
    stats: {},
    weight: 1,
    stackable: true,
    description: "\uC5F4\uBA74 \uBB34\uC791\uC704 \uC544\uC774\uD15C\uC774 \uB098\uC635\uB2C8\uB2E4. \uB808\uC5B4 \uC774\uC0C1 \uC544\uC774\uD15C \uD3EC\uD568!",
    icon: "box_mystery",
    price: 5e3,
    maxStack: 10,
    tags: ["gacha"]
  },
  legendary_box: {
    id: "legendary_box",
    name: "\uC804\uC124 \uC0C1\uC790",
    type: "consumable" /* CONSUMABLE */,
    rarity: "legendary" /* LEGENDARY */,
    stats: {},
    weight: 1,
    stackable: true,
    description: "\uB808\uC804\uB354\uB9AC \uB4F1\uAE09 \uC774\uC0C1 \uC544\uC774\uD15C \uD655\uC815 \uC9C0\uAE09!",
    icon: "box_legendary",
    price: 3e4,
    maxStack: 5,
    tags: ["gacha_legendary"]
  },
  iron_ore: {
    id: "iron_ore",
    name: "\uCCA0 \uAD11\uC11D",
    type: "material" /* MATERIAL */,
    rarity: "common" /* COMMON */,
    stats: {},
    weight: 1,
    stackable: true,
    description: "\uAE30\uBCF8 \uC7A5\uBE44 \uC81C\uC791\uC5D0 \uC4F0\uC774\uB294 \uCCA0 \uAD11\uC11D\uC785\uB2C8\uB2E4.",
    icon: "material_iron",
    price: 15,
    maxStack: 999
  },
  // ═══ TAMING ═══
  taming_stone: {
    id: "taming_stone",
    name: "\uB9C8\uC218 \uD3EC\uD68D \uC8FC\uBB38\uC11C",
    type: "consumable" /* CONSUMABLE */,
    rarity: "rare" /* RARE */,
    stats: {},
    weight: 1,
    stackable: true,
    description: "\uC120\uD0DD\uD55C \uBAAC\uC2A4\uD130\uB97C \uAE38\uB4E4\uC774\uB824 \uC2DC\uB3C4\uD569\uB2C8\uB2E4. \uC57D\uD560\uC218\uB85D \uC131\uACF5\uB960\uC774 \uB192\uC73C\uBA70 \uCD5C\uB300 2\uB9C8\uB9AC \uBCF4\uC720 \uAC00\uB2A5. \uD14C\uC774\uBC0D \uC131\uACF5 \uC2DC 30\uBD84 \uB3D9\uBC18.",
    icon: "taming_stone",
    price: 1200,
    maxStack: 10,
    tags: ["taming_stone"]
  },
  // ═══ SUMMON STONES ═══
  summon_stone_lesser: {
    id: "summon_stone_lesser",
    name: "\uD558\uAE09 \uC18C\uD658\uC11D",
    type: "consumable" /* CONSUMABLE */,
    rarity: "rare" /* RARE */,
    stats: {},
    weight: 1,
    stackable: true,
    description: "1~2\uB9C8\uB9AC\uC758 \uD558\uAE09 \uC815\uB839\uC744 60\uCD08\uAC04 \uC18C\uD658\uD569\uB2C8\uB2E4. \uC18C\uD658\uB41C \uC815\uB839\uC774 \uC790\uB3D9\uC73C\uB85C \uC801\uC744 \uACF5\uACA9\uD569\uB2C8\uB2E4.",
    icon: "summon_stone_lesser",
    price: 800,
    maxStack: 10,
    tags: ["summon_stone", "lesser"]
  },
  summon_stone_mid: {
    id: "summon_stone_mid",
    name: "\uC911\uAE09 \uC18C\uD658\uC11D",
    type: "consumable" /* CONSUMABLE */,
    rarity: "epic" /* EPIC */,
    stats: {},
    weight: 1,
    stackable: true,
    description: "2~3\uB9C8\uB9AC\uC758 \uC911\uAE09 \uC815\uB839\uC744 90\uCD08\uAC04 \uC18C\uD658\uD569\uB2C8\uB2E4. \uAC15\uB825\uD55C \uACF5\uACA9\uB825\uC73C\uB85C \uC0AC\uB0E5\uC744 \uC9C0\uC6D0\uD569\uB2C8\uB2E4.",
    icon: "summon_stone_mid",
    price: 3e3,
    maxStack: 5,
    tags: ["summon_stone", "mid"]
  },
  summon_stone_greater: {
    id: "summon_stone_greater",
    name: "\uC0C1\uAE09 \uC18C\uD658\uC11D",
    type: "consumable" /* CONSUMABLE */,
    rarity: "legendary" /* LEGENDARY */,
    stats: {},
    weight: 1,
    stackable: true,
    description: "3~5\uB9C8\uB9AC\uC758 \uC0C1\uAE09 \uC804\uC0AC\uB97C 120\uCD08\uAC04 \uC18C\uD658\uD569\uB2C8\uB2E4. \uAC15\uB825\uD55C \uC804\uC0AC\uB4E4\uC774 \uBAA8\uB4E0 \uC801\uC744 \uACA9\uD30C\uD569\uB2C8\uB2E4.",
    icon: "summon_stone_greater",
    price: 1e4,
    maxStack: 3,
    tags: ["summon_stone", "greater"]
  }
};
var ITEM_LIST = Object.values(ITEMS);

// src/game/data/npcs.ts
var NPCS = {
  elder: {
    id: "elder",
    name: "\uC5D8\uB354",
    mapId: "speakingIsland",
    role: "quest",
    position: { x: 12, y: 10 },
    dialogue: [
      "\uC774\uC57C\uAE30\uC758 \uC12C\uC5D0 \uC628 \uAC83\uC744 \uD658\uC601\uD558\uB124.",
      "\uC0AC\uB0E5\uACFC \uC5B8\uC5B4 \uD6C8\uB828\uC744 \uD568\uAED8 \uC775\uD788\uBA74 \uB354 \uBE60\uB974\uAC8C \uAC15\uD574\uC9C8 \uC218 \uC788\uC744 \uAC78\uC138."
    ]
  },
  radar: {
    id: "radar",
    name: "\uBB34\uAE30\uC0C1 \uB77C\uB2E4\uB974",
    mapId: "speakingIsland",
    role: "weapon",
    position: { x: 8, y: 14 },
    dialogue: ["\uC88B\uC740 \uBB34\uAE30\uB294 \uC0DD\uC874\uC758 \uC2DC\uC791\uC774\uC9C0. \uC2E4\uC804\uC5D0 \uB9DE\uB294 \uC7A5\uBE44\uB97C \uACE8\uB77C \uBCF4\uAC8C."],
    shopInventory: [
      { itemId: "trainee_dagger" },
      { itemId: "iron_sword" },
      { itemId: "hunter_bow" },
      { itemId: "training_arrow", quantity: 50, price: 40 }
    ]
  },
  eirin: {
    id: "eirin",
    name: "\uBC29\uC5B4\uAD6C\uC0C1 \uC5D0\uC774\uB9B0",
    mapId: "speakingIsland",
    role: "armor",
    position: { x: 10, y: 14 },
    dialogue: ["\uAC11\uC637\uC740 \uACF5\uACA9\uC744 \uB9C9\uC544 \uC8FC\uB294 \uB9C8\uC9C0\uB9C9 \uBC29\uD328\uB780\uB2E4."],
    shopInventory: [{ itemId: "leather_cap" }, { itemId: "chain_mail" }, { itemId: "guardian_ring" }]
  },
  garo: {
    id: "garo",
    name: "\uB9C8\uBC95\uC0C1 \uAC00\uB85C",
    mapId: "speakingIsland",
    role: "magic",
    position: { x: 13, y: 14 },
    dialogue: ["\uB9C8\uB098\uB294 \uD750\uB984\uC774 \uC911\uC694\uD574. \uD544\uC694\uD55C \uC21C\uAC04\uC5D0\uB294 \uC544\uB07C\uC9C0 \uB9D0\uAC8C.", "\uC18C\uD658\uC11D\uC744 \uC368\uBCF4\uAC8C. \uC815\uB839\uB4E4\uC774 \uC790\uB124\uB97C \uB3C4\uC6B8 \uAC70\uC57C."],
    shopInventory: [
      { itemId: "blue_potion" },
      { itemId: "teleport_scroll" },
      { itemId: "summon_stone_lesser" }
    ]
  },
  betty: {
    id: "betty",
    name: "\uC5EC\uAD00\uC8FC\uC778 \uBCA0\uD2F0",
    mapId: "speakingIsland",
    role: "inn",
    position: { x: 15, y: 12 },
    dialogue: ["\uD53C\uB85C\uB97C \uD138\uACE0 \uB2E4\uC74C \uBAA8\uD5D8\uC744 \uC900\uBE44\uD574 \uBD10."]
  },
  julie: {
    id: "julie",
    name: "\uBB34\uAE30\uC0C1 \uC904\uB9AC",
    mapId: "silverKnightTown",
    role: "weapon",
    position: { x: 14, y: 11 },
    dialogue: ["\uC740\uAE30\uC0AC\uB2E8\uC758 \uC7A5\uBE44\uB294 \uADE0\uD615\uC774 \uC911\uC694\uD558\uC9C0."],
    shopInventory: [{ itemId: "iron_sword" }, { itemId: "mithril_longsword" }]
  },
  knight_captain: {
    id: "knight_captain",
    name: "\uAE30\uC0AC\uB2E8\uC7A5",
    mapId: "silverKnightTown",
    role: "quest",
    position: { x: 18, y: 9 },
    dialogue: ["\uBC14\uB78C\uC232\uC740 \uC0DD\uAC01\uBCF4\uB2E4 \uB354 \uC704\uD5D8\uD558\uB2E4.", "\uC900\uBE44\uAC00 \uB05D\uB0AC\uB2E4\uBA74 \uB2E4\uC74C \uC784\uBB34\uB97C \uB9E1\uAE30\uACA0\uB2E4."]
  },
  giran_market: {
    id: "giran_market",
    name: "\uAE30\uB780 \uC2DC\uC7A5",
    mapId: "giranTown",
    role: "quest",
    position: { x: 20, y: 16 },
    dialogue: ["\uB300\uB3C4\uC2DC\uC5D0\uC11C\uB294 \uAC70\uB798\uC640 \uC815\uBCF4\uAC00 \uAC00\uC7A5 \uC911\uC694\uD558\uC9C0."]
  },
  karon: {
    id: "karon",
    name: "\uB300\uC7A5\uC7A5\uC774 \uCE74\uB860",
    mapId: "giranTown",
    role: "blacksmith",
    position: { x: 23, y: 18 },
    dialogue: ["\uC7AC\uB8CC\uB9CC \uC788\uB2E4\uBA74 \uBB34\uAE30\uB4E0 \uAC11\uC637\uC774\uB4E0 \uB9CC\uB4E4\uC5B4 \uC8FC\uC9C0."],
    shopInventory: [{ itemId: "weapon_enchant_scroll" }, { itemId: "mithril_ore" }, { itemId: "magic_crystal" }]
  },
  summon_master: {
    id: "summon_master",
    name: "\uC18C\uD658\uC0AC \uB9C8\uC774\uC544",
    mapId: "silverKnightTown",
    role: "magic",
    position: { x: 20, y: 11 },
    dialogue: [
      "\uC18C\uD658\uC11D\uC5D0 \uB9C8\uB825\uC744 \uB2F4\uC544 \uC815\uB839\uC744 \uBD88\uB7EC\uB0BC \uC218 \uC788\uB2E4\uB124.",
      "\uC0C1\uAE09 \uC18C\uD658\uC11D\uC77C\uC218\uB85D \uB354 \uAC15\uB825\uD55C \uC804\uC0AC\uB4E4\uC774 \uB098\uD0C0\uB098\uC9C0."
    ],
    shopInventory: [
      { itemId: "taming_stone" },
      { itemId: "summon_stone_lesser" },
      { itemId: "summon_stone_mid" },
      { itemId: "summon_stone_greater" }
    ]
  }
};
var NPC_LIST = Object.values(NPCS);

// src/game/data/maps.ts
var MAPS = {
  speakingIsland: {
    id: "speakingIsland",
    name: "\uC2DC\uC791\uC758 \uC12C",
    level: "1~10",
    type: "starter",
    width: 240,
    height: 200,
    tiles: ["grass" /* GRASS */, "sand" /* SAND */, "water" /* WATER */, "stone_path" /* STONE_PATH */],
    monsters: [
      "slime",
      "goblin_child",
      "wild_boar",
      "skeleton_warrior",
      "slime_boss",
      "goblin_boss",
      "skeleton_boss"
    ],
    npcs: [
      { id: "elder", x: 12, y: 10 },
      { id: "radar", x: 8, y: 14 },
      { id: "eirin", x: 10, y: 14 },
      { id: "garo", x: 13, y: 14 },
      { id: "betty", x: 15, y: 12 }
    ],
    safeZone: true,
    bgm: "peaceful_island",
    description: "\uBAA8\uB4E0 \uBAA8\uD5D8\uAC00\uAC00 \uCC98\uC74C \uBC1C\uC744 \uB514\uB514\uB294 \uCD9C\uBC1C \uC9C0\uC810\uC785\uB2C8\uB2E4.",
    connections: [
      {
        to: "silverKnightTown",
        fromPortalName: "\uB300\uB959\uD589 \uBD80\uB450",
        spawn: { x: 4, y: 20 }
      }
    ]
  },
  silverKnightTown: {
    id: "silverKnightTown",
    name: "\uCCA0\uC131 \uB9C8\uC744",
    level: "10~20",
    type: "town",
    width: 220,
    height: 180,
    tiles: ["cobblestone" /* COBBLESTONE */, "brick" /* BRICK */, "grass" /* GRASS */],
    monsters: [],
    npcs: [
      { id: "julie", x: 14, y: 11 },
      { id: "knight_captain", x: 18, y: 9 },
      { id: "summon_master", x: 20, y: 11 }
    ],
    safeZone: true,
    bgm: "medieval_town",
    description: "\uAE30\uC0AC\uB2E8\uC774 \uC218\uD638\uD558\uB294 \uCCAB \uBC88\uC9F8 \uB300\uB959 \uB9C8\uC744\uC785\uB2C8\uB2E4.",
    connections: [
      {
        to: "speakingIsland",
        fromPortalName: "\uD56D\uAD6C \uBD80\uB450",
        spawn: { x: 42, y: 24 }
      },
      {
        to: "windwoodForest",
        fromPortalName: "\uBC14\uB78C\uC232 \uC785\uAD6C",
        spawn: { x: 50, y: 18 }
      },
      {
        to: "orcForest",
        fromPortalName: "\uC624\uD06C \uBD80\uB77D\uC9C0 \uBC29\uBA74",
        spawn: { x: 10, y: 48 }
      },
      {
        to: "gludioPlain",
        fromPortalName: "\uB0A8\uCABD \uD3C9\uC6D0",
        spawn: { x: 46, y: 38 }
      }
    ]
  },
  windwoodForest: {
    id: "windwoodForest",
    name: "\uBC14\uB78C\uC232",
    level: "15~25",
    type: "hunting",
    width: 280,
    height: 220,
    tiles: ["forest_grass" /* FOREST_GRASS */, "moss" /* MOSS */, "dirt" /* DIRT */],
    monsters: ["poison_spider", "werewolf", "forest_sprite"],
    npcs: [],
    safeZone: false,
    bgm: "mystical_forest",
    description: "\uAC70\uB300\uD55C \uB098\uBB34\uC640 \uC548\uAC1C\uAC00 \uB4A4\uC5C9\uCF1C \uC788\uB294 \uC232\uC785\uB2C8\uB2E4.",
    connections: [
      {
        to: "silverKnightTown",
        fromPortalName: "\uB9C8\uC744 \uADC0\uD658\uAE38",
        spawn: { x: 2, y: 12 }
      },
      {
        to: "giranTown",
        fromPortalName: "\uC0C1\uB2E8 \uAD50\uC5ED\uB85C",
        spawn: { x: 60, y: 32 }
      },
      {
        to: "moonlitWetland",
        fromPortalName: "\uB2EC\uC548\uAC1C \uC2B5\uC9C0",
        spawn: { x: 54, y: 46 }
      }
    ]
  },
  orcForest: {
    id: "orcForest",
    name: "\uC624\uD06C \uBD80\uB77D\uC9C0",
    level: "18~28",
    type: "hunting",
    width: 260,
    height: 200,
    tiles: ["dirt" /* DIRT */, "moss" /* MOSS */, "dark_stone" /* DARK_STONE */],
    monsters: ["orc_archer", "orc_chief", "kobold_raider"],
    npcs: [],
    safeZone: false,
    bgm: "tribal_drums",
    description: "\uC804\uD22C \uBD81\uC18C\uB9AC\uAC00 \uBA40\uB9AC\uC11C \uC6B8\uB824 \uD37C\uC9C0\uB294 \uAC70\uCE5C \uC0AC\uB0E5\uD130\uC785\uB2C8\uB2E4.",
    connections: [
      {
        to: "silverKnightTown",
        fromPortalName: "\uB9C8\uC744 \uBC29\uBA74",
        spawn: { x: 4, y: 4 }
      }
    ]
  },
  gludioPlain: {
    id: "gludioPlain",
    name: "\uC11C\uBD80 \uB300\uCD08\uC6D0",
    level: "10~18",
    type: "hunting",
    width: 300,
    height: 240,
    tiles: ["grass" /* GRASS */, "dirt" /* DIRT */, "stone_path" /* STONE_PATH */],
    monsters: ["wild_boar", "goblin_child", "lizard_scout"],
    npcs: [],
    safeZone: false,
    bgm: "frontier_plain",
    description: "\uC740\uAE30\uC0AC\uC758 \uB9C8\uC744 \uB0A8\uCABD\uC5D0 \uD3BC\uCCD0\uC9C4 \uAC1C\uD65C\uC9C0 \uC0AC\uB0E5\uD130\uC785\uB2C8\uB2E4.",
    connections: [
      {
        to: "silverKnightTown",
        fromPortalName: "\uB9C8\uC744 \uC131\uBB38",
        spawn: { x: 6, y: 18 }
      }
    ]
  },
  moonlitWetland: {
    id: "moonlitWetland",
    name: "\uB2EC\uC548\uAC1C \uC2B5\uC9C0",
    level: "20~28",
    type: "hunting",
    width: 300,
    height: 240,
    tiles: ["moss" /* MOSS */, "wet_stone" /* WET_STONE */, "water" /* WATER */],
    monsters: ["bog_frog", "stone_golem", "swamp_witch", "ice_troll"],
    npcs: [],
    safeZone: false,
    bgm: "wetland_whispers",
    description: "\uB2AA\uBB3C\uACFC \uC548\uAC1C\uAC00 \uB4A4\uC11E\uC5EC \uC2DC\uC57C\uB97C \uD750\uB9AC\uB294 \uC704\uD5D8\uD55C \uC2B5\uC9C0\uC785\uB2C8\uB2E4.",
    connections: [
      {
        to: "windwoodForest",
        fromPortalName: "\uC232 \uAC00\uC7A5\uC790\uB9AC",
        spawn: { x: 8, y: 14 }
      }
    ]
  },
  giranTown: {
    id: "giranTown",
    name: "\uD669\uAE08 \uAC70\uB798 \uB3C4\uC2DC",
    level: "30~40",
    type: "town",
    width: 260,
    height: 200,
    tiles: ["marble" /* MARBLE */, "cobblestone" /* COBBLESTONE */, "stone_path" /* STONE_PATH */],
    monsters: [],
    npcs: [
      { id: "giran_market", x: 20, y: 16 },
      { id: "karon", x: 23, y: 18 }
    ],
    safeZone: true,
    bgm: "grand_bazaar",
    description: "\uC0C1\uC5C5\uACFC \uC81C\uC791\uC774 \uC9D1\uC57D\uB41C \uB300\uB959\uC758 \uC911\uC2EC \uB3C4\uC2DC\uC785\uB2C8\uB2E4.",
    connections: [
      {
        to: "windwoodForest",
        fromPortalName: "\uBD81\uCABD \uAD00\uBB38",
        spawn: { x: 6, y: 40 }
      },
      {
        to: "dragonValley",
        fromPortalName: "\uC6A9\uC758 \uACC4\uACE1 \uAE38\uBAA9",
        spawn: { x: 68, y: 28 }
      }
    ]
  },
  dragonValley: {
    id: "dragonValley",
    name: "\uC6A9\uC758 \uACC4\uACE1",
    level: "35~50",
    type: "hunting",
    width: 340,
    height: 260,
    tiles: ["volcanic_rock" /* VOLCANIC_ROCK */, "lava" /* LAVA */, "dirt" /* DIRT */],
    monsters: [
      "drake",
      "ash_wyvern",
      "red_dragon",
      "dark_elf_scout",
      "fire_elemental",
      "stone_giant",
      "ancient_dragon"
    ],
    npcs: [],
    safeZone: false,
    bgm: "dragon_roar",
    description: "\uC6A9\uC758 \uD754\uC801\uACFC \uD654\uC5FC\uC758 \uC228\uACB0\uC774 \uB0A8\uC544 \uC788\uB294 \uACE0\uC704\uD5D8 \uC9C0\uC5ED\uC785\uB2C8\uB2E4.",
    connections: [
      {
        to: "giranTown",
        fromPortalName: "\uAE30\uB780 \uBC29\uBA74 \uAE38",
        spawn: { x: 5, y: 30 }
      }
    ]
  },
  ancientCave: {
    id: "ancientCave",
    name: "\uACE0\uB300 \uB3D9\uAD74",
    level: "8~15",
    type: "dungeon",
    width: 110,
    height: 90,
    tiles: ["dark_stone" /* DARK_STONE */, "volcanic_rock" /* VOLCANIC_ROCK */],
    monsters: [
      "skeleton_warrior",
      "skeleton_boss",
      "goblin_boss",
      "vampire_bat",
      "bone_archer",
      "shadow_lich"
    ],
    npcs: [],
    safeZone: false,
    bgm: "dungeon_cave",
    description: "\uACE0\uB300\uC758 \uBE44\uBC00\uC774 \uC7A0\uB4E0 \uC5B4\uB450\uC6B4 \uB3D9\uAD74\uC785\uB2C8\uB2E4. \uAC15\uB825\uD55C \uC5B8\uB370\uB4DC \uC804\uC0AC\uAC00 \uBC30\uD68C\uD569\uB2C8\uB2E4.",
    connections: [
      {
        to: "speakingIsland",
        fromPortalName: "\uB3D9\uAD74 \uCD9C\uAD6C",
        spawn: { x: 13, y: 3 }
      }
    ]
  }
};
var MAP_LIST = Object.values(MAPS);

// src/game/data/quests.ts
var MAIN_QUESTS = [
  {
    id: "mq_001",
    name: "\uBAA8\uD5D8\uC758 \uC2DC\uC791",
    level: 1,
    zone: "speakingIsland",
    npc: "elder",
    description: "\uC774\uC57C\uAE30\uC758 \uC12C\uC5D0 \uB3C4\uCC29\uD55C \uB2F9\uC2E0. \uC5D8\uB354\uC5D0\uAC8C \uBA3C\uC800 \uC778\uC0AC\uB97C \uAC74\uB124 \uBCF4\uC138\uC694.",
    objectives: [{ type: "talk", target: "elder", count: 1 }],
    rewards: { exp: 100, gold: 50, items: ["red_potion", "red_potion"] }
  },
  {
    id: "mq_002",
    name: "\uCCAB \uBC88\uC9F8 \uC0AC\uB0E5",
    level: 2,
    zone: "speakingIsland",
    npc: "elder",
    description: "\uC2AC\uB77C\uC784 5\uB9C8\uB9AC\uB97C \uCC98\uCE58\uD558\uC138\uC694. \uD034\uC988 \uBCF4\uC0C1 \uC5EC\uBD80\uC640 \uAD00\uACC4\uC5C6\uC774 \uCC98\uCE58\uB9CC \uC778\uC815\uB429\uB2C8\uB2E4.",
    objectives: [{ type: "kill", target: "slime", count: 5 }],
    rewards: { exp: 200, gold: 100, items: ["trainee_dagger"] }
  },
  {
    id: "mq_003",
    name: "\uC5B8\uC5B4 \uD6C8\uB828",
    level: 3,
    zone: "speakingIsland",
    npc: "elder",
    description: "\uD034\uC988 10\uC5F0\uC18D \uC815\uB2F5\uC744 \uB2EC\uC131\uD558\uC138\uC694.",
    objectives: [{ type: "quiz_streak", count: 10 }],
    rewards: { exp: 500, gold: 200, items: ["blue_potion"] }
  },
  {
    id: "mq_004",
    name: "\uB300\uB959\uC73C\uB85C",
    level: 10,
    zone: "speakingIsland",
    npc: "elder",
    description: "\uC740\uAE30\uC0AC\uC758 \uB9C8\uC744\uB85C \uC774\uB3D9\uD558\uC138\uC694.",
    objectives: [{ type: "travel", target: "silverKnightTown", count: 1 }],
    rewards: { exp: 1e3, gold: 500, items: ["teleport_scroll"] }
  }
];
var DAILY_QUESTS = [
  {
    id: "dq_word_master",
    name: "\uC624\uB298\uC758 \uB2E8\uC5B4\uC655",
    level: 10,
    zone: "global",
    npc: "elder",
    description: "\uD034\uC988 \uC5F0\uC18D \uC815\uB2F5 \uAE30\uB85D\uC744 50\uAE4C\uC9C0 \uC62C\uB9AC\uC138\uC694.",
    objectives: [{ type: "quiz_streak", count: 50 }],
    rewards: { exp: 2e3, gold: 1e3, items: ["blue_potion"] },
    repeatable: "daily"
  },
  {
    id: "dq_hunter_routine",
    name: "\uC0AC\uB0E5\uAFBC\uC758 \uC77C\uACFC",
    level: 12,
    zone: "global",
    npc: "knight_captain",
    description: "\uBAAC\uC2A4\uD130 100\uB9C8\uB9AC\uB97C \uCC98\uCE58\uD558\uC138\uC694.",
    objectives: [{ type: "kill", target: "any", count: 100 }],
    rewards: { exp: 3e3, gold: 1500, items: ["weapon_enchant_scroll"] },
    repeatable: "daily"
  }
];
var QUESTS = [...MAIN_QUESTS, ...DAILY_QUESTS];

// server/gameServer.ts
import { Server } from "socket.io";

// server/combatHandler.ts
var CombatHandler = class {
  constructor(monsterManager) {
    this.monsterManager = monsterManager;
  }
  attack(monsterId, stats) {
    const monster = this.monsterManager.get(monsterId);
    if (!monster) return null;
    const weaponDamage = stats.minAttack && stats.maxAttack ? randomBetween(stats.minAttack, stats.maxAttack) : 0;
    const physical = Math.floor((stats.str ?? 0) * 0.8 + (stats.dex ?? 0) * 0.4) + weaponDamage;
    const magical = Math.floor(
      (stats.int ?? 0) * 1.1 + (stats.spellPower ?? 0) * 1.5
    );
    const baseDamage = Math.max(physical, magical);
    const levelDiff = (stats.level ?? 1) - monster.level;
    const levelMod = 1 + Math.max(-0.3, Math.min(0.3, levelDiff * 0.02));
    const defReduction = Math.max(0.15, 1 - (monster.atk > 0 ? 0 : 0));
    const critChance = Math.min(
      0.35,
      (stats.critRate ?? 0) / 100 + (stats.dex ?? 0) * 3e-3
    );
    const isCrit = Math.random() < critChance;
    const critMul = isCrit ? 1.5 + Math.random() * 0.5 : 1;
    const variance = 0.85 + Math.random() * 0.3;
    const damage = Math.max(
      1,
      Math.floor(baseDamage * levelMod * defReduction * critMul * variance)
    );
    return this.monsterManager.applyDamage(monsterId, damage);
  }
};
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// src/game/data/monsters.ts
var MONSTERS = {
  slime: {
    id: "slime",
    name: "\uC2AC\uB77C\uC784",
    level: 1,
    hp: 20,
    maxHp: 20,
    atk: 2,
    def: 0,
    exp: 10,
    goldRange: [5, 15],
    drops: [
      { itemId: "red_potion", rate: 0.1 },
      { itemId: "animal_hide", rate: 0.08 }
    ],
    aggressive: false,
    respawnTime: 10,
    moveSpeed: 1,
    sprite: "slime_green",
    isBoss: false,
    isRaidBoss: false,
    isUndead: false,
    isFlying: false,
    isMagic: false,
    spawnMapIds: ["speakingIsland"]
  },
  goblin_child: {
    id: "goblin_child",
    name: "\uAF2C\uB9C8 \uACE0\uBE14\uB9B0",
    level: 2,
    hp: 35,
    maxHp: 35,
    atk: 4,
    def: 1,
    exp: 15,
    goldRange: [8, 20],
    drops: [
      { itemId: "trainee_dagger", rate: 0.02 },
      { itemId: "animal_hide", rate: 0.18 }
    ],
    aggressive: false,
    respawnTime: 12,
    moveSpeed: 2,
    sprite: "goblin_small",
    isBoss: false,
    isRaidBoss: false,
    isUndead: false,
    isFlying: false,
    isMagic: false,
    spawnMapIds: ["speakingIsland"]
  },
  wild_boar: {
    id: "wild_boar",
    name: "\uBA67\uB3FC\uC9C0",
    level: 5,
    hp: 60,
    maxHp: 60,
    atk: 10,
    def: 2,
    exp: 30,
    goldRange: [15, 35],
    drops: [
      { itemId: "animal_hide", rate: 0.3, minQuantity: 1, maxQuantity: 2 },
      { itemId: "red_potion", rate: 0.12 }
    ],
    aggressive: true,
    respawnTime: 20,
    moveSpeed: 2,
    sprite: "boar_brown",
    isBoss: false,
    isRaidBoss: false,
    isUndead: false,
    isFlying: false,
    isMagic: false,
    spawnMapIds: ["speakingIsland"]
  },
  skeleton_warrior: {
    id: "skeleton_warrior",
    name: "\uD574\uACE8 \uC804\uC0AC",
    level: 7,
    hp: 80,
    maxHp: 80,
    atk: 12,
    def: 3,
    exp: 45,
    goldRange: [20, 50],
    drops: [
      { itemId: "iron_sword", rate: 0.01 },
      { itemId: "weapon_enchant_scroll", rate: 3e-3 }
    ],
    aggressive: true,
    respawnTime: 25,
    moveSpeed: 2,
    sprite: "skeleton_warrior",
    isBoss: false,
    isRaidBoss: false,
    isUndead: true,
    isFlying: false,
    isMagic: false,
    spawnMapIds: ["speakingIsland", "undergroundDungeon"]
  },
  poison_spider: {
    id: "poison_spider",
    name: "\uB3C5\uAC70\uBBF8",
    level: 17,
    hp: 180,
    maxHp: 180,
    atk: 28,
    def: 5,
    exp: 140,
    goldRange: [55, 110],
    drops: [
      { itemId: "animal_hide", rate: 0.1 },
      { itemId: "blue_potion", rate: 0.06 }
    ],
    aggressive: true,
    respawnTime: 25,
    moveSpeed: 3,
    special: ["poison"],
    sprite: "spider_poison",
    isBoss: false,
    isRaidBoss: false,
    isUndead: false,
    isFlying: false,
    isMagic: false,
    spawnMapIds: ["windwoodForest"]
  },
  werewolf: {
    id: "werewolf",
    name: "\uC6CC\uC6B8\uD504",
    level: 20,
    hp: 300,
    maxHp: 300,
    atk: 35,
    def: 10,
    exp: 200,
    goldRange: [80, 160],
    drops: [
      { itemId: "animal_hide", rate: 0.35, minQuantity: 1, maxQuantity: 3 },
      { itemId: "haste_potion", rate: 0.03 }
    ],
    aggressive: true,
    respawnTime: 35,
    moveSpeed: 4,
    sprite: "werewolf",
    isBoss: false,
    isRaidBoss: false,
    isUndead: false,
    isFlying: false,
    isMagic: false,
    spawnMapIds: ["windwoodForest"]
  },
  forest_sprite: {
    id: "forest_sprite",
    name: "Forest Sprite",
    level: 19,
    hp: 210,
    maxHp: 210,
    atk: 24,
    def: 6,
    exp: 155,
    goldRange: [60, 120],
    drops: [
      { itemId: "blue_potion", rate: 0.08 },
      { itemId: "magic_crystal", rate: 0.02 }
    ],
    aggressive: false,
    respawnTime: 22,
    moveSpeed: 3,
    special: ["blink"],
    sprite: "forest_sprite",
    isBoss: false,
    isRaidBoss: false,
    isUndead: false,
    isFlying: true,
    isMagic: true,
    spawnMapIds: ["windwoodForest"]
  },
  orc_archer: {
    id: "orc_archer",
    name: "\uC624\uD06C \uAD81\uC218",
    level: 18,
    hp: 160,
    maxHp: 160,
    atk: 22,
    def: 6,
    exp: 130,
    goldRange: [50, 100],
    drops: [
      { itemId: "hunter_bow", rate: 0.01 },
      { itemId: "blue_potion", rate: 0.04 }
    ],
    aggressive: true,
    respawnTime: 20,
    moveSpeed: 2,
    special: ["ranged"],
    sprite: "orc_archer",
    isBoss: false,
    isRaidBoss: false,
    isUndead: false,
    isFlying: false,
    isMagic: false,
    spawnMapIds: ["orcForest"]
  },
  kobold_raider: {
    id: "kobold_raider",
    name: "Kobold Raider",
    level: 19,
    hp: 190,
    maxHp: 190,
    atk: 24,
    def: 6,
    exp: 145,
    goldRange: [55, 105],
    drops: [
      { itemId: "animal_hide", rate: 0.18 },
      { itemId: "hunter_bow", rate: 8e-3 }
    ],
    aggressive: true,
    respawnTime: 24,
    moveSpeed: 3,
    sprite: "kobold_raider",
    isBoss: false,
    isRaidBoss: false,
    isUndead: false,
    isFlying: false,
    isMagic: false,
    spawnMapIds: ["orcForest"]
  },
  orc_chief: {
    id: "orc_chief",
    name: "\uC624\uD06C \uB300\uC7A5",
    level: 25,
    hp: 800,
    maxHp: 800,
    atk: 45,
    def: 12,
    exp: 500,
    goldRange: [150, 300],
    drops: [
      { itemId: "guardian_ring", rate: 0.01 },
      { itemId: "mithril_ore", rate: 0.08, minQuantity: 1, maxQuantity: 3 }
    ],
    aggressive: true,
    respawnTime: 120,
    moveSpeed: 2,
    sprite: "orc_chief",
    isBoss: true,
    isRaidBoss: false,
    isUndead: false,
    isFlying: false,
    isMagic: false,
    spawnMapIds: ["orcForest"]
  },
  lizard_scout: {
    id: "lizard_scout",
    name: "Lizard Scout",
    level: 16,
    hp: 150,
    maxHp: 150,
    atk: 20,
    def: 5,
    exp: 118,
    goldRange: [40, 90],
    drops: [
      { itemId: "animal_hide", rate: 0.22 },
      { itemId: "red_potion", rate: 0.12 }
    ],
    aggressive: true,
    respawnTime: 18,
    moveSpeed: 3,
    sprite: "lizard_scout",
    isBoss: false,
    isRaidBoss: false,
    isUndead: false,
    isFlying: false,
    isMagic: false,
    spawnMapIds: ["gludioPlain"]
  },
  bog_frog: {
    id: "bog_frog",
    name: "Bog Frog",
    level: 21,
    hp: 260,
    maxHp: 260,
    atk: 29,
    def: 7,
    exp: 182,
    goldRange: [75, 135],
    drops: [
      { itemId: "blue_potion", rate: 0.08 },
      { itemId: "animal_hide", rate: 0.1 }
    ],
    aggressive: true,
    respawnTime: 21,
    moveSpeed: 3,
    special: ["leap"],
    sprite: "bog_frog",
    isBoss: false,
    isRaidBoss: false,
    isUndead: false,
    isFlying: false,
    isMagic: false,
    spawnMapIds: ["moonlitWetland"]
  },
  stone_golem: {
    id: "stone_golem",
    name: "Stone Golem",
    level: 24,
    hp: 420,
    maxHp: 420,
    atk: 36,
    def: 12,
    exp: 250,
    goldRange: [110, 180],
    drops: [
      { itemId: "mithril_ore", rate: 0.08 },
      { itemId: "magic_crystal", rate: 0.04 }
    ],
    aggressive: false,
    respawnTime: 35,
    moveSpeed: 2,
    sprite: "stone_golem",
    isBoss: false,
    isRaidBoss: false,
    isUndead: false,
    isFlying: false,
    isMagic: true,
    spawnMapIds: ["moonlitWetland"]
  },
  drake: {
    id: "drake",
    name: "\uB4DC\uB808\uC774\uD06C",
    level: 38,
    hp: 1200,
    maxHp: 1200,
    atk: 65,
    def: 20,
    exp: 800,
    goldRange: [300, 600],
    drops: [
      { itemId: "mithril_ore", rate: 0.12, minQuantity: 1, maxQuantity: 2 },
      { itemId: "magic_crystal", rate: 0.05 }
    ],
    aggressive: true,
    respawnTime: 60,
    moveSpeed: 3,
    sprite: "drake_green",
    isBoss: false,
    isRaidBoss: false,
    isUndead: false,
    isFlying: false,
    isMagic: false,
    spawnMapIds: ["dragonValley"]
  },
  ash_wyvern: {
    id: "ash_wyvern",
    name: "Ash Wyvern",
    level: 42,
    hp: 1680,
    maxHp: 1680,
    atk: 74,
    def: 24,
    exp: 1180,
    goldRange: [420, 760],
    drops: [
      { itemId: "mithril_ore", rate: 0.16, minQuantity: 1, maxQuantity: 2 },
      { itemId: "weapon_enchant_scroll", rate: 0.01 }
    ],
    aggressive: true,
    respawnTime: 70,
    moveSpeed: 3,
    special: ["wing_buffet"],
    sprite: "ash_wyvern",
    isBoss: false,
    isRaidBoss: false,
    isUndead: false,
    isFlying: true,
    isMagic: false,
    spawnMapIds: ["dragonValley"]
  },
  red_dragon: {
    id: "red_dragon",
    name: "\uB808\uB4DC \uB4DC\uB798\uACE4",
    level: 50,
    hp: 1e4,
    maxHp: 1e4,
    atk: 150,
    def: 35,
    exp: 1e4,
    goldRange: [5e3, 1e4],
    drops: [
      { itemId: "mithril_longsword", rate: 2e-3 },
      { itemId: "arcana_staff", rate: 1e-3 },
      { itemId: "weapon_enchant_scroll", rate: 0.02 }
    ],
    aggressive: true,
    respawnTime: 7200,
    moveSpeed: 3,
    special: ["fire_breath", "boss_pattern"],
    sprite: "dragon_red",
    isBoss: true,
    isRaidBoss: true,
    isUndead: false,
    isFlying: true,
    isMagic: true,
    spawnMapIds: ["dragonValley"]
  },
  slime_boss: {
    id: "slime_boss",
    name: "\uC2AC\uB77C\uC784 \uC5EC\uC655",
    level: 5,
    hp: 350,
    maxHp: 350,
    atk: 15,
    def: 2,
    exp: 120,
    goldRange: [50, 100],
    drops: [
      { itemId: "red_potion", rate: 0.5, minQuantity: 2, maxQuantity: 3 },
      { itemId: "iron_sword", rate: 0.02 }
    ],
    aggressive: true,
    respawnTime: 180,
    moveSpeed: 1,
    sprite: "slime_boss",
    isBoss: true,
    isRaidBoss: false,
    isUndead: false,
    isFlying: false,
    isMagic: false,
    spawnMapIds: ["speakingIsland"]
  },
  goblin_boss: {
    id: "goblin_boss",
    name: "\uACE0\uBE14\uB9B0 \uB450\uBAA9",
    level: 7,
    hp: 480,
    maxHp: 480,
    atk: 20,
    def: 5,
    exp: 220,
    goldRange: [80, 160],
    drops: [
      { itemId: "trainee_dagger", rate: 0.15 },
      { itemId: "red_potion", rate: 0.3, minQuantity: 1, maxQuantity: 2 },
      { itemId: "summon_stone_lesser", rate: 0.08 }
    ],
    aggressive: true,
    respawnTime: 180,
    moveSpeed: 2,
    sprite: "goblin_boss",
    isBoss: true,
    isRaidBoss: false,
    isUndead: false,
    isFlying: false,
    isMagic: false,
    spawnMapIds: ["speakingIsland"]
  },
  skeleton_boss: {
    id: "skeleton_boss",
    name: "\uD574\uACE8 \uAD70\uC8FC",
    level: 10,
    hp: 720,
    maxHp: 720,
    atk: 28,
    def: 8,
    exp: 420,
    goldRange: [150, 300],
    drops: [
      { itemId: "iron_sword", rate: 0.08 },
      { itemId: "weapon_enchant_scroll", rate: 0.02 },
      { itemId: "summon_stone_lesser", rate: 0.12 },
      { itemId: "summon_stone_mid", rate: 0.03 }
    ],
    aggressive: true,
    respawnTime: 300,
    moveSpeed: 2,
    sprite: "skeleton_boss",
    isBoss: true,
    isRaidBoss: false,
    isUndead: true,
    isFlying: false,
    isMagic: false,
    spawnMapIds: ["speakingIsland"]
  },
  // ═══ NEW HUNTING GROUND MONSTERS ═══
  dark_elf_scout: {
    id: "dark_elf_scout",
    name: "\uB2E4\uD06C\uC5D8\uD504 \uCC99\uD6C4",
    level: 28,
    hp: 380,
    maxHp: 380,
    atk: 42,
    def: 10,
    exp: 280,
    goldRange: [100, 200],
    drops: [
      { itemId: "shadow_essence", rate: 0.12 },
      { itemId: "dark_elven_dagger", rate: 5e-3 }
    ],
    aggressive: true,
    respawnTime: 28,
    moveSpeed: 4,
    special: ["critical_strike"],
    sprite: "dark_elf_scout",
    isBoss: false,
    isRaidBoss: false,
    isUndead: false,
    isFlying: false,
    isMagic: true,
    spawnMapIds: ["dragonValley"]
  },
  fire_elemental: {
    id: "fire_elemental",
    name: "\uD654\uC5FC \uC815\uB839",
    level: 32,
    hp: 520,
    maxHp: 520,
    atk: 55,
    def: 8,
    exp: 380,
    goldRange: [120, 240],
    drops: [
      { itemId: "magic_crystal", rate: 0.15, minQuantity: 1, maxQuantity: 2 },
      { itemId: "dragon_bone", rate: 0.04 }
    ],
    aggressive: true,
    respawnTime: 30,
    moveSpeed: 3,
    special: ["fire_aura"],
    sprite: "fire_elemental",
    isBoss: false,
    isRaidBoss: false,
    isUndead: false,
    isFlying: true,
    isMagic: true,
    spawnMapIds: ["dragonValley"]
  },
  ice_troll: {
    id: "ice_troll",
    name: "\uC5BC\uC74C \uD2B8\uB864",
    level: 27,
    hp: 480,
    maxHp: 480,
    atk: 44,
    def: 14,
    exp: 300,
    goldRange: [90, 180],
    drops: [
      { itemId: "animal_hide", rate: 0.25, minQuantity: 1, maxQuantity: 3 },
      { itemId: "blue_potion", rate: 0.1 }
    ],
    aggressive: true,
    respawnTime: 32,
    moveSpeed: 2,
    special: ["slow"],
    sprite: "ice_troll",
    isBoss: false,
    isRaidBoss: false,
    isUndead: false,
    isFlying: false,
    isMagic: false,
    spawnMapIds: ["moonlitWetland"]
  },
  vampire_bat: {
    id: "vampire_bat",
    name: "\uD761\uD608 \uBC15\uC950",
    level: 14,
    hp: 120,
    maxHp: 120,
    atk: 18,
    def: 3,
    exp: 90,
    goldRange: [25, 55],
    drops: [
      { itemId: "blue_potion", rate: 0.06 },
      { itemId: "shadow_essence", rate: 0.04 }
    ],
    aggressive: true,
    respawnTime: 15,
    moveSpeed: 5,
    special: ["life_drain"],
    sprite: "vampire_bat",
    isBoss: false,
    isRaidBoss: false,
    isUndead: true,
    isFlying: true,
    isMagic: false,
    spawnMapIds: ["ancientCave"]
  },
  bone_archer: {
    id: "bone_archer",
    name: "\uD574\uACE8 \uAD81\uC218",
    level: 12,
    hp: 100,
    maxHp: 100,
    atk: 16,
    def: 2,
    exp: 75,
    goldRange: [20, 45],
    drops: [
      { itemId: "training_arrow", rate: 0.5, minQuantity: 5, maxQuantity: 20 },
      { itemId: "red_potion", rate: 0.08 }
    ],
    aggressive: true,
    respawnTime: 18,
    moveSpeed: 2,
    special: ["ranged"],
    sprite: "bone_archer",
    isBoss: false,
    isRaidBoss: false,
    isUndead: true,
    isFlying: false,
    isMagic: false,
    spawnMapIds: ["ancientCave"]
  },
  swamp_witch: {
    id: "swamp_witch",
    name: "\uB2AA\uC9C0 \uB9C8\uB140",
    level: 22,
    hp: 280,
    maxHp: 280,
    atk: 32,
    def: 6,
    exp: 200,
    goldRange: [70, 140],
    drops: [
      { itemId: "blue_potion", rate: 0.15 },
      { itemId: "magic_crystal", rate: 0.06 }
    ],
    aggressive: true,
    respawnTime: 25,
    moveSpeed: 2,
    special: ["poison", "curse"],
    sprite: "swamp_witch",
    isBoss: false,
    isRaidBoss: false,
    isUndead: false,
    isFlying: false,
    isMagic: true,
    spawnMapIds: ["moonlitWetland"]
  },
  stone_giant: {
    id: "stone_giant",
    name: "\uBC14\uC704 \uAC70\uC778",
    level: 33,
    hp: 700,
    maxHp: 700,
    atk: 60,
    def: 20,
    exp: 480,
    goldRange: [150, 300],
    drops: [
      { itemId: "mithril_ore", rate: 0.2, minQuantity: 2, maxQuantity: 4 },
      { itemId: "dragon_bone", rate: 0.08 }
    ],
    aggressive: false,
    respawnTime: 45,
    moveSpeed: 2,
    sprite: "stone_giant",
    isBoss: false,
    isRaidBoss: false,
    isUndead: false,
    isFlying: false,
    isMagic: false,
    spawnMapIds: ["dragonValley"]
  },
  // ═══ ELITE VERSIONS (rare spawns - 10% chance) ═══
  elite_orc_chief: {
    id: "elite_orc_chief",
    name: "\uACF5\uD3EC\uC758 \uC624\uD06C \uB300\uC7A5",
    level: 30,
    hp: 1800,
    maxHp: 1800,
    atk: 65,
    def: 18,
    exp: 1500,
    goldRange: [400, 800],
    drops: [
      { itemId: "dragon_slayer_sword", rate: 0.02 },
      { itemId: "mithril_ore", rate: 0.25, minQuantity: 3, maxQuantity: 6 },
      { itemId: "weapon_enchant_scroll", rate: 0.08 },
      { itemId: "mystery_box", rate: 0.05 }
    ],
    aggressive: true,
    respawnTime: 600,
    moveSpeed: 3,
    special: ["rage", "cleave"],
    sprite: "orc_chief",
    isBoss: true,
    isRaidBoss: false,
    isUndead: false,
    isFlying: false,
    isMagic: false,
    spawnMapIds: ["orcForest"]
  },
  // ═══ WORLD BOSS ═══
  ancient_dragon: {
    id: "ancient_dragon",
    name: "\uACE0\uB300 \uB4DC\uB798\uACE4 \uC81C\uB8E8\uC2A4",
    level: 60,
    hp: 5e4,
    maxHp: 5e4,
    atk: 250,
    def: 50,
    exp: 5e4,
    goldRange: [1e4, 2e4],
    drops: [
      { itemId: "eternal_blade", rate: 0.01 },
      { itemId: "eternal_staff", rate: 0.01 },
      { itemId: "eternal_armor", rate: 0.01 },
      { itemId: "dragon_bone", rate: 0.5, minQuantity: 5, maxQuantity: 10 },
      { itemId: "legendary_box", rate: 0.1 },
      { itemId: "weapon_enchant_scroll", rate: 0.5, minQuantity: 3, maxQuantity: 8 }
    ],
    aggressive: true,
    respawnTime: 14400,
    moveSpeed: 2,
    special: ["fire_breath", "boss_pattern", "tail_sweep", "roar"],
    sprite: "dragon_ancient",
    isBoss: true,
    isRaidBoss: true,
    isUndead: false,
    isFlying: true,
    isMagic: true,
    spawnMapIds: ["dragonValley"]
  },
  shadow_lich: {
    id: "shadow_lich",
    name: "\uC554\uD751 \uB9AC\uCE58",
    level: 45,
    hp: 8e3,
    maxHp: 8e3,
    atk: 110,
    def: 25,
    exp: 8e3,
    goldRange: [3e3, 6e3],
    drops: [
      { itemId: "void_staff", rate: 0.015 },
      { itemId: "shadow_essence", rate: 0.5, minQuantity: 3, maxQuantity: 6 },
      { itemId: "weapon_enchant_scroll", rate: 0.1 },
      { itemId: "mystery_box", rate: 0.15 }
    ],
    aggressive: true,
    respawnTime: 3600,
    moveSpeed: 2,
    special: ["death_curse", "summon_undead", "boss_pattern"],
    sprite: "shadow_lich",
    isBoss: true,
    isRaidBoss: true,
    isUndead: true,
    isFlying: false,
    isMagic: true,
    spawnMapIds: ["ancientCave"]
  }
};
var MONSTER_LIST = Object.values(MONSTERS);

// server/monsterManager.ts
var SPAWN_LAYOUTS = [
  {
    mapId: "speakingIsland",
    monsterId: "slime",
    count: 6,
    minX: 1320,
    maxX: 1880,
    minY: 160,
    maxY: 360,
    radius: 90
  },
  {
    mapId: "speakingIsland",
    monsterId: "slime",
    count: 4,
    minX: 1460,
    maxX: 2040,
    minY: 980,
    maxY: 1320,
    radius: 100
  },
  {
    mapId: "speakingIsland",
    monsterId: "goblin_child",
    count: 5,
    minX: 1320,
    maxX: 1920,
    minY: 520,
    maxY: 860,
    radius: 110
  },
  {
    mapId: "speakingIsland",
    monsterId: "wild_boar",
    count: 4,
    minX: 1860,
    maxX: 2480,
    minY: 760,
    maxY: 1320,
    radius: 130
  },
  {
    mapId: "speakingIsland",
    monsterId: "skeleton_warrior",
    count: 3,
    minX: 2140,
    maxX: 2860,
    minY: 260,
    maxY: 900,
    radius: 140
  },
  {
    mapId: "speakingIsland",
    monsterId: "goblin_child",
    count: 3,
    minX: 2460,
    maxX: 3040,
    minY: 1080,
    maxY: 1520,
    radius: 120
  },
  {
    mapId: "speakingIsland",
    monsterId: "slime_boss",
    count: 1,
    minX: 1600,
    maxX: 1900,
    minY: 300,
    maxY: 500,
    radius: 60
  },
  {
    mapId: "speakingIsland",
    monsterId: "goblin_boss",
    count: 1,
    minX: 1700,
    maxX: 2e3,
    minY: 700,
    maxY: 900,
    radius: 60
  },
  {
    mapId: "speakingIsland",
    monsterId: "skeleton_boss",
    count: 1,
    minX: 2400,
    maxX: 2700,
    minY: 400,
    maxY: 700,
    radius: 70
  },
  {
    mapId: "windwoodForest",
    monsterId: "poison_spider",
    count: 4,
    minX: 780,
    maxX: 1680,
    minY: 260,
    maxY: 860,
    radius: 120
  },
  {
    mapId: "windwoodForest",
    monsterId: "forest_sprite",
    count: 3,
    minX: 1520,
    maxX: 2380,
    minY: 260,
    maxY: 920,
    radius: 120
  },
  {
    mapId: "windwoodForest",
    monsterId: "werewolf",
    count: 3,
    minX: 1820,
    maxX: 2620,
    minY: 880,
    maxY: 1420,
    radius: 150
  },
  // ═══ Moonlit Wetland new monsters ═══
  {
    mapId: "moonlitWetland",
    monsterId: "swamp_witch",
    count: 3,
    minX: 2200,
    maxX: 3e3,
    minY: 600,
    maxY: 1100,
    radius: 120
  },
  {
    mapId: "moonlitWetland",
    monsterId: "ice_troll",
    count: 3,
    minX: 1400,
    maxX: 2400,
    minY: 800,
    maxY: 1400,
    radius: 130
  },
  // ═══ Ancient Cave new monsters ═══
  {
    mapId: "ancientCave",
    monsterId: "vampire_bat",
    count: 4,
    minX: 400,
    maxX: 1200,
    minY: 200,
    maxY: 800,
    radius: 100
  },
  {
    mapId: "ancientCave",
    monsterId: "bone_archer",
    count: 3,
    minX: 600,
    maxX: 1400,
    minY: 400,
    maxY: 1e3,
    radius: 110
  },
  {
    mapId: "ancientCave",
    monsterId: "shadow_lich",
    count: 1,
    minX: 1e3,
    maxX: 1300,
    minY: 600,
    maxY: 900,
    radius: 60
  },
  // ═══ Dragon Valley new monsters ═══
  {
    mapId: "dragonValley",
    monsterId: "dark_elf_scout",
    count: 3,
    minX: 1200,
    maxX: 2200,
    minY: 400,
    maxY: 1e3,
    radius: 140
  },
  {
    mapId: "dragonValley",
    monsterId: "fire_elemental",
    count: 3,
    minX: 1800,
    maxX: 2800,
    minY: 500,
    maxY: 1200,
    radius: 150
  },
  {
    mapId: "dragonValley",
    monsterId: "stone_giant",
    count: 2,
    minX: 2600,
    maxX: 3200,
    minY: 800,
    maxY: 1300,
    radius: 120
  },
  {
    mapId: "dragonValley",
    monsterId: "ancient_dragon",
    count: 1,
    minX: 3300,
    maxX: 3500,
    minY: 1e3,
    maxY: 1200,
    radius: 60
  },
  // ═══ Orc Forest new monsters ═══
  {
    mapId: "orcForest",
    monsterId: "elite_orc_chief",
    count: 1,
    minX: 2400,
    maxX: 2700,
    minY: 1e3,
    maxY: 1300,
    radius: 70
  },
  {
    mapId: "orcForest",
    monsterId: "orc_archer",
    count: 4,
    minX: 980,
    maxX: 1960,
    minY: 320,
    maxY: 960,
    radius: 120
  },
  {
    mapId: "orcForest",
    monsterId: "kobold_raider",
    count: 4,
    minX: 1380,
    maxX: 2280,
    minY: 840,
    maxY: 1320,
    radius: 120
  },
  {
    mapId: "orcForest",
    monsterId: "orc_chief",
    count: 1,
    minX: 2300,
    maxX: 2540,
    minY: 960,
    maxY: 1220,
    radius: 80
  },
  {
    mapId: "gludioPlain",
    monsterId: "wild_boar",
    count: 5,
    minX: 780,
    maxX: 1860,
    minY: 320,
    maxY: 980,
    radius: 130
  },
  {
    mapId: "gludioPlain",
    monsterId: "goblin_child",
    count: 4,
    minX: 1560,
    maxX: 2480,
    minY: 620,
    maxY: 1340,
    radius: 120
  },
  {
    mapId: "gludioPlain",
    monsterId: "lizard_scout",
    count: 3,
    minX: 2160,
    maxX: 2920,
    minY: 360,
    maxY: 980,
    radius: 140
  },
  {
    mapId: "moonlitWetland",
    monsterId: "bog_frog",
    count: 4,
    minX: 1180,
    maxX: 2160,
    minY: 460,
    maxY: 1320,
    radius: 120
  },
  {
    mapId: "moonlitWetland",
    monsterId: "poison_spider",
    count: 4,
    minX: 1860,
    maxX: 2820,
    minY: 280,
    maxY: 1220,
    radius: 130
  },
  {
    mapId: "moonlitWetland",
    monsterId: "stone_golem",
    count: 2,
    minX: 2580,
    maxX: 3240,
    minY: 880,
    maxY: 1520,
    radius: 150
  },
  {
    mapId: "dragonValley",
    monsterId: "drake",
    count: 4,
    minX: 1420,
    maxX: 2520,
    minY: 300,
    maxY: 1060,
    radius: 160
  },
  {
    mapId: "dragonValley",
    monsterId: "ash_wyvern",
    count: 2,
    minX: 2380,
    maxX: 3240,
    minY: 720,
    maxY: 1380,
    radius: 180
  },
  {
    mapId: "dragonValley",
    monsterId: "red_dragon",
    count: 1,
    minX: 3160,
    maxX: 3440,
    minY: 920,
    maxY: 1220,
    radius: 90
  }
];
var MonsterManager = class {
  constructor() {
    this.monsters = /* @__PURE__ */ new Map();
    this.seed();
  }
  list(mapId) {
    return Array.from(this.monsters.values()).filter((monster) => monster.mapId === mapId).map((monster) => this.ensureRespawned(monster));
  }
  listAll() {
    return Array.from(this.monsters.values()).map(
      (monster) => this.ensureRespawned(monster)
    );
  }
  get(id) {
    const monster = this.monsters.get(id);
    return monster ? this.ensureRespawned(monster) : null;
  }
  setTarget(id, targetId) {
    const monster = this.monsters.get(id);
    if (!monster) {
      return null;
    }
    monster.targetId = targetId;
    return monster;
  }
  moveTowards(id, targetX, targetY) {
    const monster = this.monsters.get(id);
    if (!monster || monster.deadUntil) {
      return null;
    }
    const angle = Math.atan2(targetY - monster.y, targetX - monster.x);
    const step = monster.moveSpeed * 18;
    const nextX = monster.x + Math.cos(angle) * step;
    const nextY = monster.y + Math.sin(angle) * step;
    if (!isInSafeZone(monster.mapId, nextX, nextY)) {
      monster.x = nextX;
      monster.y = nextY;
    }
    return monster;
  }
  returnHome(id) {
    const monster = this.monsters.get(id);
    if (!monster || monster.deadUntil) {
      return null;
    }
    monster.targetId = null;
    const distance = Math.hypot(
      monster.homeX - monster.x,
      monster.homeY - monster.y
    );
    if (distance < 18) {
      monster.x = monster.homeX;
      monster.y = monster.homeY;
      return monster;
    }
    const angle = Math.atan2(
      monster.homeY - monster.y,
      monster.homeX - monster.x
    );
    const step = monster.moveSpeed * 20;
    monster.x += Math.cos(angle) * step;
    monster.y += Math.sin(angle) * step;
    return monster;
  }
  markAttack(id, timestamp) {
    const monster = this.monsters.get(id);
    if (!monster) {
      return null;
    }
    monster.lastAttackAt = timestamp;
    return monster;
  }
  applyDamage(id, damage) {
    const monster = this.monsters.get(id);
    if (!monster || monster.deadUntil) {
      return null;
    }
    monster.hp = Math.max(0, monster.hp - damage);
    if (monster.hp > 0) {
      return { monster, defeated: false };
    }
    monster.targetId = null;
    monster.deadUntil = Date.now() + monster.respawnDelay;
    return { monster, defeated: true };
  }
  respawn(id) {
    const monster = this.monsters.get(id);
    if (!monster) {
      return null;
    }
    const next = this.reseedMonster(monster);
    this.monsters.set(id, next);
    return next;
  }
  getRespawnDelay(id) {
    return this.monsters.get(id)?.respawnDelay ?? 5e3;
  }
  ensureRespawned(monster) {
    if (!monster.deadUntil || Date.now() < monster.deadUntil) {
      return monster;
    }
    const next = this.reseedMonster(monster);
    this.monsters.set(monster.id, next);
    return next;
  }
  seed() {
    SPAWN_LAYOUTS.forEach((zone) => {
      const template = MONSTERS[zone.monsterId];
      for (let index = 0; index < zone.count; index += 1) {
        const id = `${zone.monsterId}-${index + 1}`;
        const home = this.randomPoint(zone);
        this.monsters.set(id, {
          id,
          templateId: template.id,
          mapId: zone.mapId,
          name: template.name,
          drops: template.drops,
          level: template.level,
          hp: template.maxHp,
          maxHp: template.maxHp,
          atk: template.atk,
          x: home.x,
          y: home.y,
          homeX: home.x,
          homeY: home.y,
          aggroRange: template.aggressive ? 260 : 0,
          chaseRange: 360 + template.level * 8,
          attackRange: template.special?.includes("ranged") ? 220 : 72,
          moveSpeed: 0.7 + template.moveSpeed * 0.22,
          respawnDelay: Math.max(5e3, template.respawnTime * 1e3),
          lastAttackAt: 0,
          targetId: null,
          deadUntil: null
        });
      }
    });
  }
  reseedMonster(monster) {
    const zone = SPAWN_LAYOUTS.find(
      (entry) => entry.mapId === monster.mapId && entry.monsterId === monster.templateId
    ) ?? {
      mapId: monster.mapId,
      count: 1,
      monsterId: monster.templateId,
      minX: monster.homeX - 120,
      maxX: monster.homeX + 120,
      minY: monster.homeY - 120,
      maxY: monster.homeY + 120,
      radius: 100
    };
    const template = MONSTERS[monster.templateId];
    const home = this.randomPoint(zone);
    return {
      ...monster,
      name: template.name,
      drops: template.drops,
      level: template.level,
      hp: template.maxHp,
      maxHp: template.maxHp,
      atk: template.atk,
      x: home.x,
      y: home.y,
      homeX: home.x,
      homeY: home.y,
      targetId: null,
      deadUntil: null,
      lastAttackAt: 0
    };
  }
  randomPoint(zone) {
    const map = MAPS[zone.mapId] ?? MAPS.speakingIsland;
    for (let attempt = 0; attempt < 16; attempt += 1) {
      const x = randomBetween2(zone.minX, zone.maxX) + randomBetween2(-zone.radius, zone.radius);
      const y = randomBetween2(zone.minY, zone.maxY) + randomBetween2(-zone.radius, zone.radius);
      const point = {
        x: clamp(x, 120, map.width * 72 + 140),
        y: clamp(y, 120, map.height * 52 + 140)
      };
      if (!isBlockedSpawn(zone.mapId, point.x, point.y)) {
        return point;
      }
    }
    return {
      x: clamp(zone.maxX, 120, map.width * 72 + 140),
      y: clamp(zone.maxY, 120, map.height * 52 + 140)
    };
  }
};
function randomBetween2(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
function isBlockedSpawn(mapId, x, y) {
  if (mapId !== "speakingIsland") {
    return false;
  }
  return x >= 220 && x <= 980 && y >= 180 && y <= 610;
}
function isInSafeZone(mapId, x, y) {
  if (mapId !== "speakingIsland") {
    return false;
  }
  return x >= 220 && x <= 980 && y >= 180 && y <= 610;
}

// src/data/vocabulary/advanced.ts
var ADVANCED_VOCABULARY = [
  { en: "ambiguous", kr: "\uBAA8\uD638\uD55C", category: "\uD615\uC6A9\uC0AC" },
  { en: "conundrum", kr: "\uB09C\uC81C", category: "\uBA85\uC0AC" },
  { en: "dichotomy", kr: "\uC774\uBD84\uBC95", category: "\uD559\uBB38" },
  { en: "ephemeral", kr: "\uB367\uC5C6\uB294", category: "\uD615\uC6A9\uC0AC" },
  { en: "gregarious", kr: "\uC0AC\uAD50\uC801\uC778", category: "\uD615\uC6A9\uC0AC" },
  { en: "hegemony", kr: "\uD328\uAD8C", category: "\uC815\uCE58" },
  { en: "juxtapose", kr: "\uBCD1\uCE58\uD558\uB2E4", category: "\uB3D9\uC0AC" },
  { en: "magnanimous", kr: "\uAD00\uB300\uD55C", category: "\uD615\uC6A9\uC0AC" },
  { en: "paradigm", kr: "\uD328\uB7EC\uB2E4\uC784", category: "\uD559\uBB38" },
  { en: "ubiquitous", kr: "\uD3B8\uC7AC\uD558\uB294", category: "\uD615\uC6A9\uC0AC" }
];

// src/data/vocabulary/elementary.ts
var ELEMENTARY_VOCABULARY = [
  { en: "apple", kr: "\uC0AC\uACFC", category: "\uC74C\uC2DD" },
  { en: "bread", kr: "\uBE75", category: "\uC74C\uC2DD" },
  { en: "water", kr: "\uBB3C", category: "\uC74C\uC2DD" },
  { en: "milk", kr: "\uC6B0\uC720", category: "\uC74C\uC2DD" },
  { en: "cat", kr: "\uACE0\uC591\uC774", category: "\uB3D9\uBB3C" },
  { en: "dog", kr: "\uAC1C", category: "\uB3D9\uBB3C" },
  { en: "tiger", kr: "\uD638\uB791\uC774", category: "\uB3D9\uBB3C" },
  { en: "horse", kr: "\uB9D0", category: "\uB3D9\uBB3C" },
  { en: "book", kr: "\uCC45", category: "\uD559\uAD50" },
  { en: "desk", kr: "\uCC45\uC0C1", category: "\uD559\uAD50" },
  { en: "pencil", kr: "\uC5F0\uD544", category: "\uD559\uAD50" },
  { en: "teacher", kr: "\uC120\uC0DD\uB2D8", category: "\uC0AC\uB78C" },
  { en: "friend", kr: "\uCE5C\uAD6C", category: "\uC0AC\uB78C" },
  { en: "mother", kr: "\uC5B4\uBA38\uB2C8", category: "\uC0AC\uB78C" },
  { en: "garden", kr: "\uC815\uC6D0", category: "\uC7A5\uC18C" },
  { en: "school", kr: "\uD559\uAD50", category: "\uC7A5\uC18C" },
  { en: "village", kr: "\uB9C8\uC744", category: "\uC7A5\uC18C" },
  { en: "window", kr: "\uCC3D\uBB38", category: "\uBB3C\uAC74" },
  { en: "chair", kr: "\uC758\uC790", category: "\uBB3C\uAC74" },
  { en: "door", kr: "\uBB38", category: "\uBB3C\uAC74" }
];

// src/data/vocabulary/high.ts
var HIGH_VOCABULARY = [
  { en: "accommodate", kr: "\uC218\uC6A9\uD558\uB2E4", category: "\uB3D9\uC0AC" },
  { en: "benevolent", kr: "\uC790\uBE44\uB85C\uC6B4", category: "\uD615\uC6A9\uC0AC" },
  { en: "catastrophe", kr: "\uB300\uC7AC\uC559", category: "\uBA85\uC0AC" },
  { en: "diligent", kr: "\uADFC\uBA74\uD55C", category: "\uD615\uC6A9\uC0AC" },
  { en: "elaborate", kr: "\uC815\uAD50\uD55C", category: "\uD615\uC6A9\uC0AC" },
  { en: "fluctuate", kr: "\uBCC0\uB3D9\uD558\uB2E4", category: "\uB3D9\uC0AC" },
  { en: "gratitude", kr: "\uAC10\uC0AC", category: "\uAC10\uC815" },
  { en: "hypothesis", kr: "\uAC00\uC124", category: "\uD559\uBB38" },
  { en: "inevitable", kr: "\uBD88\uAC00\uD53C\uD55C", category: "\uD615\uC6A9\uC0AC" },
  { en: "magnificent", kr: "\uC7A5\uC5C4\uD55C", category: "\uD615\uC6A9\uC0AC" }
];

// src/data/vocabulary/middle.ts
var MIDDLE_VOCABULARY = [
  { en: "adventure", kr: "\uBAA8\uD5D8", category: "\uD65C\uB3D9" },
  { en: "journey", kr: "\uC5EC\uD589", category: "\uD65C\uB3D9" },
  { en: "courage", kr: "\uC6A9\uAE30", category: "\uAC10\uC815" },
  { en: "discover", kr: "\uBC1C\uACAC\uD558\uB2E4", category: "\uB3D9\uC0AC" },
  { en: "ancient", kr: "\uACE0\uB300\uC758", category: "\uD615\uC6A9\uC0AC" },
  { en: "generous", kr: "\uAD00\uB300\uD55C", category: "\uD615\uC6A9\uC0AC" },
  { en: "knowledge", kr: "\uC9C0\uC2DD", category: "\uD559\uBB38" },
  { en: "mystery", kr: "\uC218\uC218\uAED8\uB07C", category: "\uBA85\uC0AC" },
  { en: "territory", kr: "\uC601\uD1A0", category: "\uC9C0\uB9AC" },
  { en: "universe", kr: "\uC6B0\uC8FC", category: "\uACFC\uD559" },
  { en: "village chief", kr: "\uB9C8\uC744 \uCD0C\uC7A5", category: "\uC0AC\uB78C" },
  { en: "festival", kr: "\uCD95\uC81C", category: "\uBB38\uD654" }
];

// server/quizHandler.ts
function getDifficulty(level) {
  if (level <= 15) return "elementary";
  if (level <= 30) return "middle";
  if (level <= 45) return "high";
  return "advanced";
}
var vocabularyMap = {
  elementary: ELEMENTARY_VOCABULARY,
  middle: MIDDLE_VOCABULARY,
  high: HIGH_VOCABULARY,
  advanced: ADVANCED_VOCABULARY
};
var QuizHandler = class {
  constructor() {
    this.activeQuestions = /* @__PURE__ */ new Map();
  }
  generate(monsterLevel) {
    const difficulty = getDifficulty(monsterLevel);
    const pool = vocabularyMap[difficulty];
    const entry = pool[Math.floor(Math.random() * pool.length)];
    const sameCategory = shuffle(
      pool.filter((item) => item.category === entry.category && item.en !== entry.en)
    );
    const mixed = shuffle(pool.filter((item) => item.category !== entry.category));
    const type = "kr_to_en";
    const wrongPool = [...sameCategory.slice(0, 2), ...mixed.slice(0, 1)].slice(0, 3);
    const question = {
      id: `quiz-${crypto.randomUUID()}`,
      type,
      question: entry.kr,
      correctAnswer: entry.en,
      wrongAnswers: wrongPool.map((item) => item.en),
      difficulty,
      category: entry.category
    };
    this.activeQuestions.set(question.id, question);
    return question;
  }
  verify(questionId, answer, monster) {
    const question = this.activeQuestions.get(questionId);
    if (!question) {
      return null;
    }
    const correct = question.correctAnswer === answer;
    const reward = correct ? {
      gold: monster.level * 10 + Math.floor(Math.random() * Math.max(2, monster.level * 5)),
      exp: monster.level * 50 + Math.floor(Math.random() * Math.max(10, monster.level * 20)),
      items: [],
      bonusMultiplier: 1
    } : {
      gold: 0,
      exp: 0,
      items: [],
      bonusMultiplier: 0
    };
    const items = correct ? this.rollDrops(monster) : [];
    reward.items = items.map((item) => `${item.name} x${item.quantity}`);
    this.activeQuestions.delete(questionId);
    return { correct, reward, items, question };
  }
  rollDrops(monster) {
    const rewards = [];
    monster.drops.forEach((drop) => {
      if (Math.random() > drop.rate) {
        return;
      }
      const item = ITEMS[drop.itemId];
      if (!item) {
        return;
      }
      const quantity = drop.minQuantity && drop.maxQuantity ? drop.minQuantity + Math.floor(Math.random() * (drop.maxQuantity - drop.minQuantity + 1)) : 1;
      rewards.push({
        id: item.id,
        name: item.name,
        quantity,
        rarity: item.rarity,
        type: item.type
      });
    });
    return rewards;
  }
};
function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

// server/roomManager.ts
var RoomManager = class {
  constructor() {
    this.rooms = /* @__PURE__ */ new Map();
  }
  join(mapId, player) {
    const room = this.rooms.get(mapId) ?? /* @__PURE__ */ new Map();
    room.set(player.id, player);
    this.rooms.set(mapId, room);
    return Array.from(room.values());
  }
  leave(mapId, playerId) {
    const room = this.rooms.get(mapId);
    if (!room) {
      return [];
    }
    room.delete(playerId);
    if (room.size === 0) {
      this.rooms.delete(mapId);
      return [];
    }
    return Array.from(room.values());
  }
  move(mapId, playerId, x, y) {
    const room = this.rooms.get(mapId);
    if (!room) {
      return null;
    }
    const current = room.get(playerId);
    if (!current) {
      return null;
    }
    const next = { ...current, x, y };
    room.set(playerId, next);
    return next;
  }
  list(mapId) {
    return Array.from(this.rooms.get(mapId)?.values() ?? []);
  }
};

// server/firestore.ts
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
var firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);
async function loadPlayer(playerId) {
  try {
    const snap = await getDoc(doc(db, "players", playerId));
    if (!snap.exists()) return null;
    return snap.data();
  } catch (err) {
    console.error("[Firestore] load failed:", err.message);
    return null;
  }
}
async function savePlayer(playerId, data) {
  try {
    await setDoc(doc(db, "players", playerId), { ...data, updatedAt: Date.now() });
  } catch (err) {
    console.error("[Firestore] save failed:", err.message);
  }
}

// server/gameServer.ts
function createStarterState(payload) {
  const className = normalizeClassName(payload.className);
  const starterInventory = [toSessionItem("red_potion", 10), toSessionItem("teleport_scroll", 3)];
  const starterEquipment = {};
  if (className === "Ranger") {
    starterEquipment.weapon = toSessionItem("hunter_bow", 1);
    starterInventory.push(toSessionItem("training_arrow", 200));
  } else if (className === "Arcanist") {
    starterEquipment.weapon = toSessionItem("arcana_staff", 1);
  } else {
    starterEquipment.weapon = toSessionItem("trainee_dagger", 1);
  }
  return {
    id: payload.id,
    name: payload.name,
    className,
    mapId: payload.mapId ?? "speakingIsland",
    gold: 75,
    exp: 0,
    level: 1,
    hp: 52,
    maxHp: 52,
    mp: 18,
    maxMp: 18,
    equipment: starterEquipment,
    quests: QUESTS.map((quest) => ({
      questId: quest.id,
      status: "available",
      progress: 0
    })),
    quizCorrectStreak: 0,
    lastAttackAt: 0,
    inventory: starterInventory
  };
}
function createGameServer(server2) {
  const io = new Server(server2, {
    cors: {
      origin: "*"
    }
  });
  const rooms = new RoomManager();
  const monsters = new MonsterManager();
  const combat = new CombatHandler(monsters);
  const quizzes = new QuizHandler();
  const sessions = /* @__PURE__ */ new Map();
  const groundLoot = /* @__PURE__ */ new Map();
  setInterval(() => {
    const now = Date.now();
    monsters.listAll().forEach((monster) => {
      if (monster.hp <= 0) {
        return;
      }
      const playersInMap = rooms.list(monster.mapId).map((presence) => ({
        presence,
        session: sessions.get(presence.id)
      })).filter((entry) => Boolean(entry.session));
      const currentTarget = monster.targetId ? playersInMap.find((entry) => entry.presence.id === monster.targetId) : null;
      let activeTarget = currentTarget;
      if (!activeTarget) {
        activeTarget = playersInMap.map((entry) => ({
          ...entry,
          distance: getDistance(monster.x, monster.y, entry.presence.x, entry.presence.y)
        })).filter((entry) => entry.distance <= monster.aggroRange).sort((a, b) => a.distance - b.distance)[0] ?? null;
        if (activeTarget) {
          monsters.setTarget(monster.id, activeTarget.presence.id);
        }
      }
      if (!activeTarget) {
        if (getDistance(monster.x, monster.y, monster.homeX, monster.homeY) > 4) {
          const returned = monsters.returnHome(monster.id);
          if (returned) {
            io.to(monster.mapId).emit("monster:updated", returned);
          }
        }
        return;
      }
      const distanceToTarget = getDistance(monster.x, monster.y, activeTarget.presence.x, activeTarget.presence.y);
      const distanceFromHome = getDistance(monster.homeX, monster.homeY, activeTarget.presence.x, activeTarget.presence.y);
      if (activeTarget.session.hp <= 0 || distanceFromHome > monster.chaseRange || isInsideMonsterSafeZone(monster.mapId, activeTarget.presence.x, activeTarget.presence.y)) {
        const returned = monsters.returnHome(monster.id);
        if (returned) {
          io.to(monster.mapId).emit("monster:updated", returned);
        }
        return;
      }
      if (distanceToTarget > monster.attackRange) {
        const moved = monsters.moveTowards(monster.id, activeTarget.presence.x, activeTarget.presence.y);
        if (moved) {
          io.to(monster.mapId).emit("monster:updated", moved);
        }
        return;
      }
      if (now - monster.lastAttackAt < 1200) {
        return;
      }
      monsters.markAttack(monster.id, now);
      const incomingDamage = Math.max(1, monster.atk - Math.floor(getDerivedAc(activeTarget.session) / 3));
      activeTarget.session.hp = Math.max(0, activeTarget.session.hp - incomingDamage);
      if (activeTarget.session.hp === 0) {
        const expLost = Math.floor(getExpToNext(activeTarget.session.level) * 0.1);
        activeTarget.session.exp = Math.max(0, activeTarget.session.exp - expLost);
        activeTarget.session.hp = getDerivedMaxHp(activeTarget.session);
        activeTarget.session.mp = getDerivedMaxMp(activeTarget.session);
        io.to(activeTarget.presence.id).emit("player:death", { expLost });
        const returned = monsters.returnHome(monster.id);
        if (returned) {
          io.to(monster.mapId).emit("monster:updated", returned);
        }
      }
      io.to(activeTarget.presence.id).emit("player:state", serializePlayerState(activeTarget.session));
    });
  }, 400);
  io.on("connection", (socket) => {
    let currentMapId = "speakingIsland";
    let playerId = socket.id;
    let playerName = "Guest";
    socket.on("player:connect", async (payload) => {
      playerId = payload.id;
      playerName = payload.name;
      currentMapId = payload.mapId ?? "speakingIsland";
      socket.join(currentMapId);
      let session = sessions.get(playerId);
      if (!session) {
        const saved = await loadPlayer(playerId);
        if (saved) {
          session = {
            id: playerId,
            name: saved.name,
            className: saved.className,
            mapId: saved.mapId,
            gold: saved.gold,
            exp: saved.exp,
            level: saved.level,
            hp: saved.hp,
            maxHp: saved.maxHp,
            mp: saved.mp,
            maxMp: saved.maxMp,
            inventory: saved.inventory,
            equipment: saved.equipment,
            quests: saved.quests,
            quizCorrectStreak: saved.quizCorrectStreak,
            lastAttackAt: 0
          };
          currentMapId = saved.mapId;
        } else {
          session = createStarterState(payload);
        }
      }
      sessions.set(playerId, session);
      const occupants = rooms.join(currentMapId, {
        id: playerId,
        name: playerName,
        mapId: currentMapId,
        x: 400,
        y: 300
      });
      socket.emit("world:init", {
        selfId: playerId,
        players: occupants,
        monsters: monsters.list(currentMapId)
      });
      socket.emit("player:state", serializePlayerState(session));
      socket.to(currentMapId).emit("player:joined", { id: playerId, name: playerName });
    });
    socket.on("player:move", (payload) => {
      const player = rooms.move(currentMapId, playerId, payload.x, payload.y);
      if (player) {
        socket.to(currentMapId).emit("player:moved", player);
      }
    });
    socket.on("map:travel", (payload) => {
      const session = sessions.get(playerId);
      if (!session) {
        return;
      }
      const currentMap = MAPS[currentMapId];
      const connection = currentMap?.connections.find((entry) => entry.to === payload.to);
      if (!connection) {
        return;
      }
      rooms.leave(currentMapId, playerId);
      socket.to(currentMapId).emit("player:left", { id: playerId });
      socket.leave(currentMapId);
      currentMapId = payload.to;
      session.mapId = payload.to;
      socket.join(currentMapId);
      const occupants = rooms.join(currentMapId, {
        id: playerId,
        name: playerName,
        mapId: currentMapId,
        x: connection.spawn.x * 36 + 120,
        y: connection.spawn.y * 20 + 100
      });
      progressTravelQuests(session, currentMapId);
      socket.emit("world:init", {
        selfId: playerId,
        players: occupants,
        monsters: monsters.list(currentMapId)
      });
      socket.emit("player:state", serializePlayerState(session));
      socket.to(currentMapId).emit("player:joined", { id: playerId, name: playerName });
    });
    socket.on("npc:interact", (payload) => {
      const session = sessions.get(playerId);
      if (!session || !NPCS[payload.npcId]) {
        return;
      }
      progressTalkQuests(session, payload.npcId);
      socket.emit("player:state", serializePlayerState(session));
    });
    socket.on("quest:accept", (payload) => {
      const session = sessions.get(playerId);
      if (!session) {
        return;
      }
      const quest = session.quests.find((entry) => entry.questId === payload.questId);
      if (!quest || quest.status !== "available") {
        return;
      }
      quest.status = "in_progress";
      quest.progress = 0;
      socket.emit("player:state", serializePlayerState(session));
    });
    socket.on("quest:claim", (payload) => {
      const session = sessions.get(playerId);
      if (!session) {
        return;
      }
      const progress = session.quests.find((entry) => entry.questId === payload.questId);
      const quest = QUESTS.find((entry) => entry.id === payload.questId);
      if (!progress || !quest || progress.status !== "claimable") {
        return;
      }
      session.gold += quest.rewards.gold;
      applyExpReward(session, quest.rewards.exp);
      quest.rewards.items.forEach((itemId) => addInventoryItem(session, toSessionItem(itemId, 1)));
      progress.status = "completed";
      socket.emit("player:state", serializePlayerState(session));
    });
    socket.on("combat:attack", (payload) => {
      const session = sessions.get(playerId);
      if (!session) {
        return;
      }
      const weapon = session.equipment.weapon ? ITEMS[session.equipment.weapon.id] : null;
      const usesBow = weapon?.subtype === "bow" /* BOW */;
      if (usesBow && !removeInventoryItem(session, "training_arrow", 1)) {
        socket.emit("chat:message", {
          id: crypto.randomUUID(),
          author: "System",
          channel: "system",
          message: "\uD654\uC0B4\uC774 \uBD80\uC871\uD569\uB2C8\uB2E4.",
          timestamp: Date.now()
        });
        socket.emit("player:state", serializePlayerState(session));
        return;
      }
      const now = Date.now();
      const attackCooldown = getAttackCooldown(session);
      if (now - session.lastAttackAt < attackCooldown) {
        return;
      }
      session.lastAttackAt = now;
      monsters.setTarget(payload.monsterId, playerId);
      const result = combat.attack(payload.monsterId, getCombatProfile(session));
      if (!result) {
        if (usesBow) {
          socket.emit("player:state", serializePlayerState(session));
        }
        return;
      }
      io.to(currentMapId).emit("monster:updated", result.monster);
      if (!result.defeated) {
        if (usesBow) {
          socket.emit("player:state", serializePlayerState(session));
        }
        return;
      }
      progressKillQuests(session, result.monster);
      socket.emit("player:state", serializePlayerState(session));
      const question = quizzes.generate(result.monster.level);
      socket.emit("quiz:open", {
        monsterId: result.monster.id,
        monsterLevel: result.monster.level,
        streak: session.quizCorrectStreak,
        question,
        choices: shuffle2([question.correctAnswer, ...question.wrongAnswers])
      });
      setTimeout(() => {
        const respawned = monsters.respawn(result.monster.id);
        if (respawned) {
          io.to(respawned.mapId).emit("monster:updated", respawned);
        }
      }, monsters.getRespawnDelay(result.monster.id));
    });
    socket.on(
      "quiz:answer",
      (payload) => {
        const session = sessions.get(playerId);
        const monster = payload.monsterId ? monsters.get(payload.monsterId) : null;
        if (!session || !monster) {
          return;
        }
        const result = quizzes.verify(payload.questionId, payload.answer, monster);
        if (!result) {
          return;
        }
        let spawnedLoot = [];
        if (result.correct) {
          session.quizCorrectStreak += 1;
          session.gold += result.reward.gold;
          applyExpReward(session, result.reward.exp);
          syncQuizStreakQuests(session);
          spawnedLoot = result.items.map((item, index) => {
            const loot = {
              ...item,
              lootId: crypto.randomUUID(),
              ownerId: playerId,
              x: monster.x + index * 18,
              y: monster.y + 28
            };
            groundLoot.set(loot.lootId, loot);
            return loot;
          });
        } else {
          session.quizCorrectStreak = 0;
          syncQuizStreakQuests(session);
        }
        socket.emit("quiz:result", {
          correct: result.correct,
          reward: result.reward,
          question: result.question,
          playerState: serializePlayerState(session)
        });
        if (spawnedLoot.length > 0) {
          socket.emit("loot:spawn", {
            items: spawnedLoot.map((loot) => ({
              lootId: loot.lootId,
              itemId: loot.id,
              name: loot.name,
              quantity: loot.quantity,
              x: loot.x,
              y: loot.y
            }))
          });
        }
      }
    );
    socket.on("loot:pickup", (payload) => {
      const session = sessions.get(playerId);
      const loot = groundLoot.get(payload.lootId);
      if (!session || !loot || loot.ownerId !== playerId) {
        return;
      }
      addInventoryItem(session, loot);
      groundLoot.delete(payload.lootId);
      socket.emit("loot:picked", { lootId: payload.lootId });
      socket.emit("player:state", serializePlayerState(session));
    });
    socket.on("inventory:consume", (payload) => {
      const session = sessions.get(playerId);
      if (!session) return;
      const entry = session.inventory.find((item) => item.id === payload.itemId);
      const itemData = ITEMS[payload.itemId];
      if (!entry || !itemData || itemData.type !== "consumable" /* CONSUMABLE */ && itemData.type !== "scroll" /* SCROLL */) {
        return;
      }
      removeInventoryItem(session, payload.itemId, 1);
      session.hp = Math.min(getDerivedMaxHp(session), session.hp + (itemData.stats.hp ?? 0));
      session.mp = Math.min(getDerivedMaxMp(session), session.mp + (itemData.stats.mp ?? 0));
      socket.emit("player:state", serializePlayerState(session));
    });
    socket.on("inventory:equip", (payload) => {
      const session = sessions.get(playerId);
      if (!session) return;
      const index = session.inventory.findIndex((item2) => item2.id === payload.itemId);
      if (index === -1) return;
      const slot = getEquipSlot(payload.itemId, session.equipment);
      if (!slot) return;
      const [item] = session.inventory.splice(index, 1);
      const previous = session.equipment[slot];
      session.equipment[slot] = item;
      if (previous) {
        session.inventory.push(previous);
      }
      session.hp = Math.min(getDerivedMaxHp(session), session.hp);
      session.mp = Math.min(getDerivedMaxMp(session), session.mp);
      socket.emit("player:state", serializePlayerState(session));
    });
    socket.on("inventory:unequip", (payload) => {
      const session = sessions.get(playerId);
      if (!session) return;
      const equipped = session.equipment[payload.slot];
      if (!equipped) return;
      delete session.equipment[payload.slot];
      addInventoryItem(session, equipped);
      session.hp = Math.min(getDerivedMaxHp(session), session.hp);
      session.mp = Math.min(getDerivedMaxMp(session), session.mp);
      socket.emit("player:state", serializePlayerState(session));
    });
    socket.on("shop:buy", (payload) => {
      const session = sessions.get(playerId);
      const shop = NPCS[payload.shopId];
      const item = ITEMS[payload.itemId];
      const entry = shop?.shopInventory?.find((value) => value.itemId === payload.itemId);
      const price = entry?.price ?? item?.price ?? 0;
      if (!session || !shop || !entry || !item || session.gold < price) {
        return;
      }
      session.gold -= price;
      addInventoryItem(session, toSessionItem(item.id, entry?.quantity ?? 1));
      socket.emit("player:state", serializePlayerState(session));
    });
    socket.on("shop:sell", (payload) => {
      const session = sessions.get(playerId);
      const shop = NPCS[payload.shopId];
      const item = ITEMS[payload.itemId];
      const price = Math.max(1, Math.floor((item?.price ?? 0) * 0.5));
      if (!session || !shop || !item) {
        return;
      }
      const removed = removeInventoryItem(session, payload.itemId, 1);
      if (!removed) {
        return;
      }
      session.gold += price;
      socket.emit("player:state", serializePlayerState(session));
    });
    socket.on("chat:send", (payload) => {
      io.to(currentMapId).emit("chat:message", {
        id: crypto.randomUUID(),
        author: playerName,
        channel: "normal",
        message: payload.message,
        timestamp: Date.now()
      });
    });
    socket.on("disconnect", async () => {
      const session = sessions.get(playerId);
      if (session) {
        await savePlayer(playerId, {
          name: session.name,
          className: session.className,
          mapId: session.mapId,
          gold: session.gold,
          exp: session.exp,
          level: session.level,
          hp: session.hp,
          maxHp: session.maxHp,
          mp: session.mp,
          maxMp: session.maxMp,
          inventory: session.inventory,
          equipment: session.equipment,
          quests: session.quests,
          quizCorrectStreak: session.quizCorrectStreak,
          updatedAt: Date.now()
        });
        sessions.delete(playerId);
      }
      rooms.leave(currentMapId, playerId);
      Array.from(groundLoot.entries()).forEach(([lootId, loot]) => {
        if (loot.ownerId === playerId) {
          groundLoot.delete(lootId);
        }
      });
      socket.to(currentMapId).emit("player:left", { id: playerId });
    });
  });
  setInterval(() => {
    sessions.forEach((session, id) => {
      savePlayer(id, {
        name: session.name,
        className: session.className,
        mapId: session.mapId,
        gold: session.gold,
        exp: session.exp,
        level: session.level,
        hp: session.hp,
        maxHp: session.maxHp,
        mp: session.mp,
        maxMp: session.maxMp,
        inventory: session.inventory,
        equipment: session.equipment,
        quests: session.quests,
        quizCorrectStreak: session.quizCorrectStreak,
        updatedAt: Date.now()
      });
    });
  }, 6e4);
  return io;
}
function toSessionItem(itemId, quantity) {
  const item = ITEMS[itemId];
  return {
    id: itemId,
    name: item?.name ?? itemId,
    quantity,
    rarity: item?.rarity ?? "common",
    type: item?.type ?? "material"
  };
}
function addInventoryItem(session, item) {
  const existing = session.inventory.find((entry) => entry.id === item.id);
  if (existing) {
    existing.quantity += item.quantity;
    return;
  }
  session.inventory.push({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    rarity: item.rarity,
    type: item.type
  });
}
function removeInventoryItem(session, itemId, quantity) {
  const existing = session.inventory.find((entry) => entry.id === itemId);
  if (!existing || existing.quantity < quantity) {
    return false;
  }
  existing.quantity -= quantity;
  if (existing.quantity <= 0) {
    session.inventory = session.inventory.filter((entry) => entry.id !== itemId);
  }
  return true;
}
function getCombatProfile(session) {
  const weapon = session.equipment.weapon ? ITEMS[session.equipment.weapon.id] : null;
  if (weapon?.subtype === "staff" /* STAFF */) {
    return {
      str: 2,
      dex: 1,
      int: 8 + (weapon.stats.maxAttack ?? 2) + (weapon.stats.spellPower ?? 0)
    };
  }
  if (weapon?.subtype === "bow" /* BOW */) {
    return {
      str: 3,
      dex: 6 + (weapon.stats.maxAttack ?? 2) + (weapon.stats.rangedDamage ?? 0),
      int: 1
    };
  }
  return {
    str: 6 + (weapon?.stats.maxAttack ?? 2),
    dex: 2,
    int: 1
  };
}
function getAttackCooldown(session) {
  const weapon = session.equipment.weapon ? ITEMS[session.equipment.weapon.id] : null;
  if (weapon?.subtype === "bow" /* BOW */) {
    return 900;
  }
  if (weapon?.subtype === "staff" /* STAFF */) {
    return 1050;
  }
  return 760;
}
function getEquipSlot(itemId, equipment) {
  const item = ITEMS[itemId];
  if (!item) return null;
  if (item.type === "weapon" /* WEAPON */) return "weapon";
  if (item.subtype === "armor" /* ARMOR */) return "armor";
  if (item.subtype === "helmet" /* HELMET */) return "helmet";
  if (item.subtype === "shield" /* SHIELD */) return "shield";
  if (item.subtype === "cloak" /* CLOAK */) return "cloak";
  if (item.subtype === "boots" /* BOOTS */) return "boots";
  if (item.subtype === "gloves" /* GLOVES */) return "gloves";
  if (item.subtype === "ring" /* RING */) return equipment.ring1 ? "ring2" : "ring1";
  if (item.subtype === "amulet" /* AMULET */) return "amulet";
  if (item.subtype === "belt" /* BELT */) return "belt";
  return null;
}
function getDerivedMaxHp(session) {
  const hpBonus = Object.values(session.equipment).reduce((sum, item) => {
    return sum + (item ? ITEMS[item.id]?.stats.hp ?? 0 : 0);
  }, 0);
  return session.maxHp + hpBonus;
}
function getDerivedMaxMp(session) {
  const mpBonus = Object.values(session.equipment).reduce((sum, item) => {
    return sum + (item ? ITEMS[item.id]?.stats.mp ?? 0 : 0);
  }, 0);
  return session.maxMp + mpBonus;
}
function getDerivedAc(session) {
  const acBonus = Object.values(session.equipment).reduce((sum, item) => {
    return sum + (item ? ITEMS[item.id]?.stats.ac ?? 0 : 0);
  }, 0);
  return 10 + acBonus;
}
function serializePlayerState(session) {
  return {
    gold: session.gold,
    exp: session.exp,
    level: session.level,
    hp: session.hp,
    maxHp: getDerivedMaxHp(session),
    mp: session.mp,
    maxMp: getDerivedMaxMp(session),
    inventory: session.inventory,
    equipment: session.equipment,
    quests: session.quests,
    mapId: session.mapId
  };
}
function applyExpReward(session, expReward) {
  session.exp += expReward;
  while (session.exp >= getExpToNext(session.level)) {
    session.exp -= getExpToNext(session.level);
    session.level += 1;
    session.maxHp += 6;
    session.maxMp += 3;
  }
  session.hp = getDerivedMaxHp(session);
  session.mp = getDerivedMaxMp(session);
}
function progressTalkQuests(session, npcId) {
  QUESTS.forEach((questData) => {
    const objective = questData.objectives[0];
    const progress = session.quests.find((entry) => entry.questId === questData.id);
    if (!objective || !progress || progress.status !== "in_progress") {
      if (progress && progress.status === "ready_to_turn_in" && questData.npc === npcId) {
        progress.status = "claimable";
      }
      return;
    }
    if (objective.type === "talk" && objective.target === npcId) {
      const goal = objective.count ?? 1;
      progress.progress = goal;
      progress.status = "claimable";
    }
  });
}
function progressKillQuests(session, monster) {
  QUESTS.forEach((questData) => {
    const objective = questData.objectives[0];
    const progress = session.quests.find((entry) => entry.questId === questData.id);
    if (!objective || !progress || progress.status !== "in_progress" || objective.type !== "kill") {
      return;
    }
    const target = objective.target;
    const matches = target === "any" || target === monster.id || monster.id.startsWith(`${target ?? ""}-`);
    if (!matches) {
      return;
    }
    const goal = objective.count ?? 1;
    progress.progress = Math.min(goal, progress.progress + 1);
    if (progress.progress >= goal) {
      progress.status = "ready_to_turn_in";
    }
  });
}
function syncQuizStreakQuests(session) {
  QUESTS.forEach((questData) => {
    const objective = questData.objectives[0];
    const progress = session.quests.find((entry) => entry.questId === questData.id);
    if (!objective || !progress || progress.status !== "in_progress" || objective.type !== "quiz_streak") {
      return;
    }
    const goal = objective.count ?? 1;
    progress.progress = Math.min(goal, session.quizCorrectStreak);
    progress.status = session.quizCorrectStreak >= goal ? "ready_to_turn_in" : "in_progress";
  });
}
function progressTravelQuests(session, mapId) {
  QUESTS.forEach((questData) => {
    const objective = questData.objectives[0];
    const progress = session.quests.find((entry) => entry.questId === questData.id);
    if (!objective || !progress || progress.status !== "in_progress") {
      return;
    }
    const isTravelObjective = objective.type === "travel" || objective.type === "reach";
    if (!isTravelObjective || objective.target !== mapId) {
      return;
    }
    progress.progress = objective.count ?? 1;
    progress.status = "ready_to_turn_in";
  });
}
function shuffle2(items) {
  return [...items].sort(() => Math.random() - 0.5);
}
function getExpToNext(level) {
  return 100 + (level - 1) * 50;
}
function getDistance(ax, ay, bx, by) {
  return Math.hypot(ax - bx, ay - by);
}
function normalizeClassName(value) {
  const normalized = (value ?? "Guardian").trim().toLowerCase();
  if (normalized.includes("ranger") || normalized.includes("\uB808\uC778\uC800")) return "Ranger";
  if (normalized.includes("arcan") || normalized.includes("\uC544\uB974\uCE74")) return "Arcanist";
  if (normalized.includes("sovereign") || normalized.includes("\uAD70\uC8FC")) return "Sovereign";
  return "Guardian";
}
function isInsideMonsterSafeZone(mapId, x, y) {
  if (mapId !== "speakingIsland") {
    return false;
  }
  return x >= 220 && x <= 980 && y >= 180 && y <= 610;
}

// server/index.ts
var app2 = express();
var server = http.createServer(app2);
app2.get("/health", (_req, res) => {
  res.json({ ok: true, service: "runeword-chronicle-server" });
});
createGameServer(server);
var port = Number(process.env.PORT ?? 3001);
server.listen(port, () => {
  console.log(`RuneWord Chronicle server listening on ${port}`);
});
