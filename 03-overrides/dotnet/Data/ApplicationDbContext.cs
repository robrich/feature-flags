namespace FeatureFlagWithOverrides.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    : base(options) { }

    public DbSet<FeatureFlag> FeatureFlags => Set<FeatureFlag>();
    public DbSet<User> Users => Set<User>();
    public DbSet<UserFlag> UserFlags => Set<UserFlag>();
}
