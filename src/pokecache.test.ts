import { Cache } from "./pokecache.js";
import {test, expect} from "vitest";

test.concurrent.each([
    {
        key: "https://example.com",
        value: "testdata",
        interval: 500,
    },
    {
        key: "https://example.com/path", 
        value: "moretestdata",
        interval: 1000,
    },


]) ("Test Caching $interval ms", async ({key, value, interval}) => {
    const cache = new Cache (interval);

    cache.add (key, value);
    const cached =  cache.get(key);
    expect (cached).toBe(value);

    await new Promise((resolve) => setTimeout(resolve, interval * 2));
    const reaped = cache.get(key);
    expect(reaped).toBe(undefined);

    cache.stopReapLoop(); 
})