using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Seed.Data.Migrations;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Seed.Data
{
    public interface IDocumentDbContext : IDbContext
    {
        DbSet<Document> Document { get; set; }
    }
}
