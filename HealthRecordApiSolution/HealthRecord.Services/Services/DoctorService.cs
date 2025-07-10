using HealthRecord.Data.Repositories;
using HealthRecord.Services.Dtos;
using HealthRecord.Data.Entities;
using HealthRecord.Data;


namespace HealthRecord.Services 
{
    public class DoctorService : IDoctorService
    {
        private readonly IDoctorRepository _doctorRepository;

        public DoctorService(IDoctorRepository doctorRepository)
        {
            _doctorRepository = doctorRepository;
        }

        public async Task<int> RegisterDoctorAsync(RegisterDoctorDto doctorDto)
        {


            var doctor = new Doctor
            {
                Name = doctorDto.Name ,
                Email = doctorDto.Email,
                Password = doctorDto.Password,
                Specialization = doctorDto.Specialization,
                IsApproved = false
                
            };

            return await _doctorRepository.RegisterDoctorAsync(doctor);
        }

        



        public async Task<Doctor> GetDoctorProfileAsync(int doctorId)
        {
            return await _doctorRepository.GetDoctorProfileAsync(doctorId);
        }



        public async Task<List<Doctor>> GetAllDoctorsAsync()
        {
            return await _doctorRepository.GetAllDoctorsAsync();
         }


    }
}
