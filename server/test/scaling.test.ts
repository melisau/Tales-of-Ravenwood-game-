import assert from 'node:assert/strict';
import { test } from 'node:test';
import { d20SuccessChance, distributeDamage, scaleDifficulty, startingHpPerPlayer } from '../../shared/scaling';

test('2-4 oyuncu: DC %15 kolay, HP yüksek', () => {
  const r = scaleDifficulty(3, 12);
  assert.equal(r.tier, 'SMALL');
  assert.equal(r.finalDC, 10); // 12 * 0.85 = 10.2
  assert.equal(r.partyHPMultiplier, 1.3);
  assert.equal(r.distributeDamage, false);
  assert.equal(startingHpPerPlayer(3), 13);
});

test('5-8 oyuncu: standart', () => {
  const r = scaleDifficulty(6, 12);
  assert.equal(r.tier, 'STANDARD');
  assert.equal(r.finalDC, 12);
  assert.equal(r.partyHPMultiplier, 1);
});

test('9-12 oyuncu: DC %20 zor, hasar dağıtılır', () => {
  const r = scaleDifficulty(10, 15);
  assert.equal(r.tier, 'LARGE');
  assert.equal(r.finalDC, 18);
  assert.equal(r.distributeDamage, true);
});

test('sınırlar: tier geçişleri ve DC tavan/taban', () => {
  assert.equal(scaleDifficulty(4, 10).tier, 'SMALL');
  assert.equal(scaleDifficulty(5, 10).tier, 'STANDARD');
  assert.equal(scaleDifficulty(8, 10).tier, 'STANDARD');
  assert.equal(scaleDifficulty(9, 10).tier, 'LARGE');
  assert.equal(scaleDifficulty(12, 20).finalDC, 20); // 24 → 20'ye kırpılır
  assert.equal(scaleDifficulty(2, 2).finalDC, 2);
  assert.throws(() => scaleDifficulty(1, 10), RangeError);
  assert.throws(() => scaleDifficulty(13, 10), RangeError);
  assert.throws(() => scaleDifficulty(4.5, 10), RangeError);
});

test('d20 başarı olasılığı nat1/nat20 kurallarına uyar', () => {
  assert.equal(d20SuccessChance(10), 0.55);
  assert.equal(d20SuccessChance(25), 0.05); // sadece nat 20
  assert.equal(d20SuccessChance(1), 0.95); // nat 1 her zaman başarısız
});

test('hasar dağıtımı: toplam korunur, zarcı ilk puanı alır, yük yayılır', () => {
  const players = [
    { id: 'a', hp: 10 },
    { id: 'b', hp: 10 },
    { id: 'c', hp: 10 },
    { id: 'd', hp: 10 },
  ];
  assert.deepEqual(distributeDamage(3, players, 'a', false), { a: 3 });
  const spread = distributeDamage(6, players, 'c', true);
  assert.equal(Object.values(spread).reduce((s, v) => s + v, 0), 6);
  assert.ok((spread.c ?? 0) >= 1);
  assert.ok(Math.max(...Object.values(spread)) <= 2, 'kimse 2den fazla hasar almamalı');
});
