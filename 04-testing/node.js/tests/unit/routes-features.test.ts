import type { Request, Response } from 'express';
import { describe, beforeEach, afterEach, test, expect, vi, afterAll } from 'vitest';

// Hoisted-friendly mock factory: create mocks inside the factory and
// import them below so tests can configure their behavior.
vi.mock('../../src/data/feature-flag-repository.js', () => ({
  __esModule: true,
  default: vi.fn(),
  getAllFlags: vi.fn()
}));

import * as handlers from '../../src/routes/features.js';
import mockGetFlag, { getAllFlags as mockGetAllFlags } from '../../src/data/feature-flag-repository.js';

describe('routes/features', () => {
  beforeEach(() => {
    mockGetFlag.mockReset();
    mockGetAllFlags.mockReset();
  });
  afterAll(() => {
    vi.resetModules();
    vi.restoreAllMocks();
  });

  test('Feature1_ReturnsEnabledMessage_WhenFlagEnabled', async () => {
    // Arrange
    const flagValue = true;
    const expected = 'Feature 1 is enabled';

    // Mocks
    mockGetFlag.mockResolvedValue(flagValue);
    const req = {} as Request;
    const res = { json: vi.fn(), send: vi.fn() } as unknown as Response;

    // Act
    await handlers.feature1Handler(req, res);

    // Assert
    expect(res.json).toHaveBeenCalledWith({message: expected});
  });

  test('Feature1_ReturnsDisabledMessage_WhenFlagDisabled', async () => {
    // Arrange
    const flagValue = false;
    const expected = 'Feature 1 is disabled';

    // Mocks
    mockGetFlag.mockResolvedValue(flagValue);
    const req = {} as Request;
    const res = { json: vi.fn(), send: vi.fn() } as unknown as Response;

    // Act
    await handlers.feature1Handler(req, res);

    // Assert
    expect(res.json).toHaveBeenCalledWith({message: expected});
  });

  test('Feature2_ReturnsJson_WhenEnabled', async () => {
    // Arrange
    const flagValue = true;
    const expected = 'Feature 2 outputs json when enabled';

    // Mocks
    mockGetFlag.mockResolvedValue(flagValue);
    const req = {} as Request;
    const res = { json: vi.fn(), send: vi.fn() } as unknown as Response;

    // Act
    await handlers.feature2Handler(req, res);

    // Assert
    expect(res.json).toHaveBeenCalledWith({message: expected});
  });

  test('Feature2_ReturnsText_WhenDisabled', async () => {
    // Arrange
    const flagValue = false;
    const expected = 'Feature 2 outputs text when disabled';

    // Mocks
    mockGetFlag.mockResolvedValue(flagValue);
    const req = {} as Request;
    const res = { json: vi.fn(), send: vi.fn() } as unknown as Response;

    // Act
    await handlers.feature2Handler(req, res);

    // Assert
    expect(res.send).toHaveBeenCalledWith(expected);
  });

  test.each([true, false])('Feature3_ReturnsFlagValue (%s)', async (flagValue: boolean) => {
    // Arrange
    mockGetFlag.mockResolvedValue(flagValue);

    // Mocks
    const req = {} as Request;
    const res = { json: vi.fn(), send: vi.fn() } as unknown as Response;

    // Act
    await handlers.feature3Handler(req, res);

    // Assert
    expect(res.json).toHaveBeenCalledWith({THREE: flagValue});
  });

  test('All_ReturnsAllFeatureFlags', async () => {
    // Arrange
    const expected = { ONE: true, TWO: false, THREE: true };

    // Mocks
    mockGetAllFlags.mockResolvedValue(expected);
    const req = {} as Request;
    const res = { json: vi.fn(), send: vi.fn() } as unknown as Response;

    // Act
    await handlers.allHandler(req, res);

    // Assert
    expect(res.json).toHaveBeenCalledWith(expected);
  });
});
