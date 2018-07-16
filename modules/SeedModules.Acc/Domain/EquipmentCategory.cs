using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SeedModules.Acc.Domain
{
    /// <summary>
    /// 设备类型
    /// </summary>
    public class EquipmentCategory
    {
        [Key]
        public int Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public ICollection<EquipmentCategory> Children { get; set; }
    }
}
