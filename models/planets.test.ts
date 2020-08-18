import { assertEquals, assertNotEquals } from 'https://deno.land/std/testing/asserts.ts'

import { filterHabitablePlanets } from './planets.ts'

const HABITABLE_PLANET = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1",
  koi_smass: "1",
};

const NON_HABITABLE_PLANET_1 = {
  koi_disposition: "FALSE POSITIVE",
};

const TOO_LARGE_PRAD = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1.5",
  koi_srad: "1",
  koi_smass: "1"
}

const TOO_LARGE_SRAD = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1.01",
  koi_smass: "1"
}

const TOO_LARGE_SMASS = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1",
  koi_smass: "1.04"
}

Deno.test('filter only habitable planets', () => {
  const filteredPlanets = filterHabitablePlanets([
    HABITABLE_PLANET,
    NON_HABITABLE_PLANET_1,
    TOO_LARGE_PRAD,
    TOO_LARGE_SRAD,
    TOO_LARGE_SMASS,
  ])
  assertEquals(filteredPlanets, [HABITABLE_PLANET])
})


Deno.test({
  name: 'should work - long',
  ignore: true,
  fn() {
    console.log('runnning');
    assertEquals('deno', 'deno')
    assertNotEquals({}, {test: true})
  }
})

Deno.test('should work - short', () => {
  console.log('runnning');
  assertEquals('deno', 'deno')
  assertNotEquals({}, {test: true})
})

Deno.test({
  name: 'ops leak',
  sanitizeOps: false,
  fn() {
    setTimeout(() => {
      console.log('leeeeeak')
    }, 10000);
  }
})

Deno.test({
  name: 'resource leak',
  sanitizeResources: false,
  async fn() {
    await Deno.open('./models/planets.ts')
  }
})