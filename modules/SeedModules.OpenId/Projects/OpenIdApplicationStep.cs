using System;
using System.Threading;
using System.Threading.Tasks;
using OpenIddict.Core;
using OpenIddict.EntityFrameworkCore.Models;
using SeedModules.Project.Models;
using SeedModules.Project.Services;

namespace SeedModules.OpenId.Projects
{
    public class OpenIdApplicationStep : IProjectStepHandler
    {
        readonly OpenIddictApplicationManager<OpenIddictApplication> _applicationManager;

        public OpenIdApplicationStep(OpenIddictApplicationManager<OpenIddictApplication> applicationManager)
        {
            _applicationManager = applicationManager;
        }

        public async Task ExecuteAsync(ProjectExecutionContext context)
        {
            if (!string.Equals(context.Name, "OpenIdApplication", StringComparison.OrdinalIgnoreCase))
            {
                return;
            }

            var model = context.Step.ToObject<OpenIdApplicationStepModel>();
            var application = new OpenIddictApplication();
            if (model.Id != 0)
            {
                application = await _applicationManager.FindByIdAsync(model.Id.ToString(), CancellationToken.None);
            }
            application.ClientId = model.ClientId;
            application.DisplayName = model.DisplayName;
            // application.AllowAuthorizationCodeFlow = model.AllowAuthorizationCodeFlow;
            // application.AllowClientCredentialsFlow = model.AllowClientCredentialsFlow;
            // application.AllowHybridFlow = model.AllowHybridFlow;
            // application.AllowImplicitFlow = model.AllowImplicitFlow;
            // application.AllowPasswordFlow = model.AllowPasswordFlow;
            // application.AllowRefreshTokenFlow = model.AllowRefreshTokenFlow;
            // application.LogoutRedirectUri = model.LogoutRedirectUri;
            // application.RedirectUri = model.RedirectUri;
            // application.SkipConsent = model.SkipConsent;
            // application.RoleNames = model.RoleNames;
            application.Type = model.Type.ToString();

            if (model.Type == ClientType.Private)
            {
                await _applicationManager.CreateAsync(application, model.ClientSecret, CancellationToken.None);
            }
            else
            {
                await _applicationManager.CreateAsync(application, CancellationToken.None);
            }
        }
    }
}