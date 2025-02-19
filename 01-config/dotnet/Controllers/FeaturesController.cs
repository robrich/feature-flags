namespace FeatureFlagFromConfig.Controllers;

[ApiController]
[Route("features")]
public class FeaturesController(AppSettings appSettings, IConfiguration configuration) : ControllerBase
{
	[HttpGet("feature1")]
	public ActionResult Feature1()
    {
        bool feature2 = appSettings.FeatureIsEnabled(FeatureFlags.ONE);
        if (feature2)
        {
            return Ok(new { Message = "Feature 1 is enabled" });
        }
        else
        {
            return Ok(new { Message = "Feature 1 is disabled" });
        }
	}

	[HttpGet("feature2")]
	public ActionResult Feature2()
	{
		bool feature2 = appSettings.FeatureIsEnabled(FeatureFlags.TWO);
		if (feature2)
		{
			return Ok(new { Message = "Feature 2 returns json when enabled" });
		}
		else
		{
			return Ok("Feature 2 returns text when disabled");
		}
	}

    [HttpGet("feature3")]
    public ActionResult Feature3()
    {
        return Ok(new { Feature3 = appSettings.FeatureIsEnabled(FeatureFlags.THREE) });
    }

    [HttpGet("all")]
	public ActionResult All()
	{
        // FRAGILE: If no config defines it, it won't be here
        return Ok(appSettings.FeatureFlags);
	}

    // FRAGILE: may leak corporate IP
	[HttpGet("env")]
	public ActionResult Env()
	{
        var section = configuration.GetSection("FeatureFlags");
        var featureFlags = section.AsEnumerable();
        return Ok(featureFlags);
	}
}
