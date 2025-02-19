namespace FeatureFlagWithOverrides.Services;

public interface IFeatureFlagInitializer
{
    void EnsureInitialized();
}

public class FeatureFlagInitializer(ApplicationDbContext dbContext) : IFeatureFlagInitializer
{

    // TODO: a CI tool should do this instead:
    public void EnsureInitialized()
    {
        dbContext.Database.EnsureCreated();
        if (!dbContext.FeatureFlags.Any())
        {
            foreach (FeatureFlags flag in Enum.GetValues<FeatureFlags>())
            {
                bool value = Random.Shared.Next(0, 10) > 5;
                var expireDate = DateTime.UtcNow.AddDays(60);
                Console.WriteLine($"{flag}: {value}");
                dbContext.FeatureFlags.Add(new FeatureFlag { Key = flag.ToString(), Value = value });
            }
            List<string> users = ["Jon", "Jane"];
            int userFlagId = 0;
            for (int i = 0; i < users.Count; i++)
            {
                int id = i + 1;
                var name = users[i];
                dbContext.Users.Add(new User { Id = id, Name = name });
                foreach (FeatureFlags flag in Enum.GetValues<FeatureFlags>())
                {
                    bool value = Random.Shared.Next(0, 10) > 5;
                    userFlagId++;
                    Console.WriteLine($"{name}'s {flag}: {value}");
                    dbContext.UserFlags.Add(new UserFlag { Id = userFlagId, UserId = id, FeatureFlagKey = flag.ToString(), Value = value });
                }
            }
            dbContext.SaveChanges();
        }
    }

}
