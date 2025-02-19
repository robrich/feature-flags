namespace FeatureFlagWithOverrides.Data;

public class UserFlag
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string FeatureFlagKey { get; set; } = "";
    public bool Value { get; set; }

    [ForeignKey(nameof(UserId))]
    public User User { get; set; } = null!;
    [ForeignKey(nameof(FeatureFlagKey))]
    public FeatureFlag FeatureFlag { get; set; } = null!;
}
