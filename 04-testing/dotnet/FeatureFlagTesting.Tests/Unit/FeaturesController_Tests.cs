namespace FeatureFlagTesting.Tests.Unit;

public class FeaturesController_Tests
{
    [Fact]
    public void Feature1_ReturnsEnabledMessage_WhenFlagEnabled()
    {
        // Arrange
        bool flagOne = true;
        string expected = "Feature 1 is enabled";

        // Mocks
        var ioc = new Fixture().Customize(new AutoNSubstituteCustomization());
        ioc.Customize<BindingInfo>(c => c.OmitAutoProperties());
        var repo = ioc.Freeze<IFeatureFlagRepository>();
        repo.FeatureIsEnabled(FeatureFlags.ONE).Returns(flagOne);
        var controller = ioc.Create<FeaturesController>();

        // Act
        var result = controller.Feature1();

        // Assert
        result.ShouldBeOfType<OkObjectResult>();
        var ok = (OkObjectResult)result;
        ok.Value.ShouldBeOfType<MessageViewModel>();
        var vm = (MessageViewModel)ok.Value!;
        vm.Message.ShouldBe(expected);
    }

    [Fact]
    public void Feature1_ReturnsDisabledMessage_WhenFlagDisabled()
    {
        // Arrange
        bool flagOne = false;
        string expected = "Feature 1 is disabled";

        // Mocks
        var ioc = new Fixture().Customize(new AutoNSubstituteCustomization());
        ioc.Customize<BindingInfo>(c => c.OmitAutoProperties());
        var repo = ioc.Freeze<IFeatureFlagRepository>();
        repo.FeatureIsEnabled(FeatureFlags.ONE).Returns(flagOne);
        var controller = ioc.Create<FeaturesController>();

        // Act
        var result = controller.Feature1();

        // Assert
        result.ShouldBeOfType<OkObjectResult>();
        var ok = (OkObjectResult)result;
        ok.Value.ShouldBeOfType<MessageViewModel>();
        var vm = (MessageViewModel)ok.Value!;
        vm.Message.ShouldBe(expected);
    }

    [Fact]
    public void Feature2_ReturnsJson_WhenEnabled()
    {
        // Arrange
        bool flagTwo = true;
        string expected = "Feature 2 returns json when enabled";

        // Mocks
        var ioc = new Fixture().Customize(new AutoNSubstituteCustomization());
        ioc.Customize<BindingInfo>(c => c.OmitAutoProperties());
        var repo = ioc.Freeze<IFeatureFlagRepository>();
        repo.FeatureIsEnabled(FeatureFlags.TWO).Returns(flagTwo);
        var controller = ioc.Create<FeaturesController>();

        // Act
        var result = controller.Feature2();

        // Assert
        result.ShouldBeOfType<OkObjectResult>();
        var ok = (OkObjectResult)result;
        ok.Value.ShouldBeOfType<MessageViewModel>();
        var vm = (MessageViewModel)ok.Value!;
        vm.Message.ShouldBe(expected);
    }

    [Fact]
    public void Feature2_ReturnsText_WhenDisabled()
    {
        // Arrange
        bool flagTwo = false;
        string expected = "Feature 2 returns text when disabled";

        // Mocks
        var ioc = new Fixture().Customize(new AutoNSubstituteCustomization());
        ioc.Customize<BindingInfo>(c => c.OmitAutoProperties());
        var repo = ioc.Freeze<IFeatureFlagRepository>();
        repo.FeatureIsEnabled(FeatureFlags.TWO).Returns(flagTwo);
        var controller = ioc.Create<FeaturesController>();

        // Act
        var result = controller.Feature2();

        // Assert
        result.ShouldBeOfType<OkObjectResult>();
        var ok = (OkObjectResult)result;
        ok.Value.ShouldBe(expected);
    }

    [Theory]
    [InlineData(true)]
    [InlineData(false)]
    public void Feature3_ReturnsFlagValue(bool flagValue)
    {
        // Arrange
        bool flagThree = flagValue;
        var expected = flagThree;

        // Mocks
        var ioc = new Fixture().Customize(new AutoNSubstituteCustomization());
        ioc.Customize<BindingInfo>(c => c.OmitAutoProperties());
        var repo = ioc.Freeze<IFeatureFlagRepository>();
        repo.FeatureIsEnabled(FeatureFlags.THREE).Returns(flagThree);
        var controller = ioc.Create<FeaturesController>();

        // Act
        var result = controller.Feature3();

        // Assert
        result.ShouldBeOfType<OkObjectResult>();
        var ok = (OkObjectResult)result;
        ok.Value.ShouldBeOfType<Feature3ViewModel>();
        var vm = (Feature3ViewModel)ok.Value!;
        vm.Feature3.ShouldBe(expected);
    }

    [Fact]
    public void All_ReturnsAllFeatureFlags()
    {
        // Arrange
        var expected = new Dictionary<string, bool>
        {
            { "ONE", true },
            { "TWO", false },
            { "THREE", true }
        };

        // Mocks
        var ioc = new Fixture().Customize(new AutoNSubstituteCustomization());
        ioc.Customize<BindingInfo>(c => c.OmitAutoProperties());
        var repo = ioc.Freeze<IFeatureFlagRepository>();
        repo.GetAllFeatureFlags().Returns(expected);
        var controller = ioc.Create<FeaturesController>();

        // Act
        var result = controller.All();

        // Assert
        result.ShouldBeOfType<OkObjectResult>();
        var ok = (OkObjectResult)result;
        ok.Value.ShouldBe(expected);
    }
}
