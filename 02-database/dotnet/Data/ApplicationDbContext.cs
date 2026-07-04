namespace FeatureFlagFromDatabase.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    : base(options) { }

    public DbSet<FeatureFlag> FeatureFlags => Set<FeatureFlag>();
}
