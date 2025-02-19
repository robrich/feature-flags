namespace FeatureFlagWithOverrides.Data;

public class User
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; } = "";

    public List<UserFlag> Flags { get; set; } = new();
}
