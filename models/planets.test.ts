import { assertEquals, assertNotEquals } from 'https://deno.land/std/testing/asserts.ts'

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