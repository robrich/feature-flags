namespace FeatureFlagAzureAppConfig.Data;

/*
Azure App Configuration docs:
- https://learn.microsoft.com/en-us/azure/azure-app-configuration/quickstart-azure-app-configuration-create?tabs=azure-portal#create-an-app-configuration-store
- https://learn.microsoft.com/en-us/azure/azure-app-configuration/quickstart-feature-flag-aspnet-core
*/

public interface IFeatureFlagRepository
{
    Task<bool> FeatureIsEnabled(FeatureFlags featureFlag);
    Task<Dictionary<string, bool>> GetAllFeatureFlags();
}

public class FeatureFlagRepository(IVariantFeatureManager featureManager) : IFeatureFlagRepository
{
    public async Task<bool> FeatureIsEnabled(FeatureFlags featureFlag)
    {
        return await featureManager.IsEnabledAsync(featureFlag.ToString());
    }

    public async Task<Dictionary<string, bool>> GetAllFeatureFlags()
    {
        // App Config Feature Management doesn't have a GetAll in the SDK
        // https://apidocs.harness.io/tag/Feature-Flags/#operation/GetAllFeatures

        var results = new Dictionary<string, bool>();
        foreach (var flag in Enum.GetValues<FeatureFlags>())
        {
            results.Add(flag.ToString(), await FeatureIsEnabled(flag));
        }
        return results;
    }
}
