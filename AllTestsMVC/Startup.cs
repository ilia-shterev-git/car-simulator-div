using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AllTestsMVC.Startup))]
namespace AllTestsMVC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
