namespace FeatureFlagFromDatabase.Data;

public class FeatureFlag
{
    [Key]
    public string Key { get; set; } = "";
    public bool Value { get; set; }
    public DateTime ExpireDate { get; set; }
}

// Avoids magic strings
public enum FeatureFlags
{
    ONE,
    TWO,
    THREE
}
