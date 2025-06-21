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
                Name = doctorDto.Name,
                Email = doctorDto.Email,
                Password = doctorDto.Password,
                Specialization = doctorDto.Specialization
            };

            return await _doctorRepository.RegisterDoctorAsync(doctor);
        }

        // public async Task<int> LoginDoctorAsync(DocLoginDto docLoginDto)
        // {
        //     var doctor = await _doctorRepository.GetDoctorByEmailAsync(docLoginDto.Email);

        //     if (doctor.Password != docLoginDto.Password)
        //      throw new Exception("Wrong credentials.");

        //     return doctor.DoctorId;
        //  }



    }
}
