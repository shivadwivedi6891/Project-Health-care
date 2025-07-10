using HealthRecord.Data;
using HealthRecord.Data.Entities;
using HealthRecord.Data.Repositories;
using HealthRecord.Services.Dtos;


namespace HealthRecord.Services
{
    public class AdminService : IAdminService
    {
        private readonly IAdminRepository _adminRepository;
        private readonly IUserRepository _userRepository;

        private readonly IDoctorRepository _doctorRepository;

        private readonly HealthRecordContext _context;

        public AdminService(IAdminRepository adminRepository, IUserRepository userRepository, IDoctorRepository doctorRepository)
        {
            _adminRepository = adminRepository;
            _userRepository = userRepository;
            _doctorRepository = doctorRepository;
        }

        public async Task<Admin> GetAdminProfileAsync(int adminId)
        {
            return await _adminRepository.GetAdminProfileByIdAsync(adminId);
        }


        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllUsersAsync();

            return users.Select(u => new UserDto
            {
                UserId = u.UserId,
                Name = u.Name,
                Email = u.Email,
                Age = u.Age

            });

        }

        public async Task<IEnumerable<DoctorDto>> GetAllDoctorsAsync()
        {
            var doctors = await _doctorRepository.GetAllDocsAsync();
            return doctors.Select(d => new DoctorDto
            {
                DoctorId = d.DoctorId,
                Name = d.Name,
                Email = d.Email,
                Specialization = d.Specialization


            });
        }


        // public async Task<IEnumerable<Doctor>> GetPendingDoctorsAsync()
        // {
        //     var doctors = await _doctorRepository.GetAllPendingDoctorsAsync();


        //     return doctors.Select(d => new DoctorDto
        //     {
        //         DoctorId = d.DoctorId,
        //         Name = d.Name,
        //         Email = d.Email
        //     });
        // }


  public async Task<IEnumerable<DoctorDto>> GetUnapprovedDoctorsAsync()
    {
        var unapprovedDoctors = await _doctorRepository.GetUnapprovedDoctorsAsync();
        
        return unapprovedDoctors.Select(d => new DoctorDto
        {
            DoctorId = d.DoctorId,
            Name = d.Name,
            Email = d.Email,
            Specialization = d.Specialization,
            IsApproved = d.IsApproved
        });
    }

    public async Task ApproveDoctorAsync(int doctorId)
    {
        var doctor = await _doctorRepository.GetDoctorByIdAsync(doctorId);
        if (doctor == null)
            throw new Exception("Doctor not found");

        doctor.IsApproved = true;
        await _doctorRepository.UpdateDoctorAsync(doctor);
    }
}










    }
    

