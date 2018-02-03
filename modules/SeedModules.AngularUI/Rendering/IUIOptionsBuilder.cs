using System.Threading.Tasks;

namespace SeedModules.AngularUI.Rendering
{
    public interface IUIOptionsBuilder
    {
        Task<string> Build();
    }
}