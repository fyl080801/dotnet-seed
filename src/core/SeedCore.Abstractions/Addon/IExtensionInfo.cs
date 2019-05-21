using SeedCore.Addon.Features;
using SeedCore.Addon.Manifests;
using System.Collections.Generic;

namespace SeedCore.Addon
{
    public interface IExtensionInfo
    {
        /// <summary>
        /// The id of the extension
        /// </summary>
        string Id { get; }

        /// <summary>
        /// The path to the extension
        /// </summary>
        string SubPath { get; }

        bool Exists { get; }

        /// <summary>
        /// The manifest info of the extension
        /// </summary>
        IManifestInfo Manifest { get; }

        /// <summary>
        /// List of features in extension
        /// </summary>
        IEnumerable<IFeatureInfo> Features { get; }
    }
}
