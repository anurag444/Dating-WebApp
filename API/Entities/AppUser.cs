using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; } //this will be primary key
        public string UserName { get; set; }
        public byte[] PasswordHash {get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}