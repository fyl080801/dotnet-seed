namespace SeedModules.OpenId.Projects
{
    public class OpenIdApplicationStepModel
    {
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string DisplayName { get; set; }
        public int Id { get; set; }
        public string LogoutRedirectUri { get; set; }
        public string RedirectUri { get; set; }
        public ClientType Type { get; set; }
        public bool SkipConsent { get; set; }
        //public List<string> RoleNames { get; set; } = new List<string>();
        public bool AllowPasswordFlow { get; set; }
        public bool AllowClientCredentialsFlow { get; set; }
        public bool AllowAuthorizationCodeFlow { get; set; }
        public bool AllowRefreshTokenFlow { get; set; }
        public bool AllowImplicitFlow { get; set; }
        public bool AllowHybridFlow { get; set; }
    }

    public enum ClientType
    {
        Private,
        Public
    }
}