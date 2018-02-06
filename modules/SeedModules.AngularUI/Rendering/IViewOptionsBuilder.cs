using System.Threading.Tasks;

namespace SeedModules.AngularUI.Rendering
{
    public interface IViewOptionsBuilder
    {
        Task<string> Build();
    }
}