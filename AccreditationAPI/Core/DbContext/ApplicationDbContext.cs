using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using AccreditationAPI.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using AccreditationAPI.Core.Constants;

namespace AccreditationAPI.Core.DbContext
{
    public class ApplicationDbContext : IdentityDbContext<AccountUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Log> Logs { get; set; }

        
        //public DbSet<Faculty> Faculty{get;set;}

        public class FacultyConfiguration : IEntityTypeConfiguration<Faculty>
        {
            public void Configure(EntityTypeBuilder<Faculty> builder)
            {
                builder.ToTable("Faculty");
             
                builder.HasData
                (
                    new Faculty
                    {
                        FacultyId = Guid.NewGuid(),
                        FacultyName = StaticUserFaculty.FSKTM
                    },
                    new Faculty
                    {
                        FacultyId = Guid.NewGuid(),
                        FacultyName = StaticUserFaculty.FBL
                    },
                    new Faculty
                    {
                        FacultyId = Guid.NewGuid(),
                        FacultyName = StaticUserFaculty.PHARMACY
                    },
                    new Faculty
                    {
                        FacultyId = Guid.NewGuid(),
                        FacultyName = StaticUserFaculty.ENGINE
                    },
                    new Faculty
                    {
                        FacultyId = Guid.NewGuid(),
                        FacultyName = StaticUserFaculty.EDU
                    },
                    new Faculty
                    {
                        FacultyId = Guid.NewGuid(),
                        FacultyName = StaticUserFaculty.DENTISTRY

                    },
                    new Faculty
                    {
                        FacultyId = Guid.NewGuid(),
                        FacultyName = StaticUserFaculty.FBAC
                    },
                    new Faculty
                    {
                        FacultyId = Guid.NewGuid(),
                        FacultyName = StaticUserFaculty.MEDIC
                    },
                    new Faculty
                    {
                        FacultyId = Guid.NewGuid(),
                        FacultyName = StaticUserFaculty.SCIENCE
                    },
                    new Faculty
                    {
                        FacultyId = Guid.NewGuid(),
                        FacultyName = StaticUserFaculty.FSSS
                    },
                    new Faculty
                    {
                        FacultyId = Guid.NewGuid(),
                        FacultyName = StaticUserFaculty.FCES
                    },
                    new Faculty
                    {
                        FacultyId = Guid.NewGuid(),
                        FacultyName = StaticUserFaculty.LAW
                    },
                    new Faculty
                    {
                        FacultyId = Guid.NewGuid(),
                        FacultyName = StaticUserFaculty.SES
                    }
                );
            }
        }

        
        public DbSet<Programme> Programmes { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new FacultyConfiguration());
            base.OnModelCreating(builder);

            //Config we want
            
            builder.Entity<Programme>(e =>
            {
                e.ToTable("Programme");
                e.Property(e => e.ProgramID);
                e.Property(e => e.ProgramNameEng);
                e.Property(e=> e.ProgramNameMalay);
                e.Property(e => e.Faculty);
                e.Property(e => e.AccreditationType);
                e.Property(e => e.ExpiryDate)
                .HasColumnType("Date");
                e.Property(e => e.Status);
                e.Property(e => e.ProgrammeDocUrl);
                e.Property(e => e.MQRNum);
                e.Property(e => e.ReferredMQRNum);
                e.Property(e => e.RegisteredMQR);
                e.Property(e => e.StudyMode);
                e.Property(e => e.NECCode);
                e.Property(e => e.MinDurationOfStudy);
                e.Property(e => e.MaxDurationOfStudy);
                e.Property(e => e.CreditHrs);
                e.Property(e => e.ApprovedDateSenate)
                 .HasColumnType("Date");
                e.Property(e => e.AccreditationStatus);
                e.Property(e => e.ApprovalCertJPT);
                e.Property(e => e.Remarks);
                e.Property(e => e.PhaseReAccreditation);
                e.Property(e => e.ApprovedDateSenateReAccreditation)
                 .HasColumnType("Date");
                e.Property(e => e.DurationReAccreditation);
                e.Property(e => e.RemarksReAccreditation);
                e.Property(e => e.CreatedDt);
                e.Property(e => e.IsActive);
                e.Property(e => e.IsDeleted);
                
                

            });
            //1
            builder.Entity<AccountUser>(e =>
            {
                e.ToTable("Users");
            });
          
            //2
            builder.Entity<IdentityUserClaim<string>>(e =>
            {
                e.ToTable("UserClaims");
            });
            //3
            builder.Entity<IdentityUserLogin<string>>(e =>
            {
                e.ToTable("UserLogins");
            });
            //4
            builder.Entity<IdentityUserToken<string>>(e =>
            {
                e.ToTable("UserTokens");
            });
            //5
            builder.Entity<IdentityRole>(e =>
            {
                e.ToTable("Roles");
            });

            
            //6
            builder.Entity<IdentityRoleClaim<string>>(e =>
            {
                e.ToTable("RoleClaims");
            });
            //6
            builder.Entity<IdentityUserRole<string>>(e =>
            {
                e.ToTable("UserRoles");
            });

           
        }

        internal Task FindAsync(string v)
        {
            throw new NotImplementedException();
        }
    }
}
