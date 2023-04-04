using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YummiReview.Models
{
    [Table("establishments")]
    public class Establishments
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("name")]
        public string Name { get; set; }
        [Column("type")]
        public int Type { get; set; }
        [Column("kitchen")]
        public int Kitchen { get; set; }
        [Column("city")]
        public int City { get; set; }
        [Column("street")]
        public string Street { get; set; }
        [Column("time")]
        public string Time { get; set; }
        [Column("averageBill")]
        public int AverageBill { get; set; }
        [Column("phone")]
        public string Phone { get; set; }
        [Column("article")]
        public string Article { get; set; }
        [Column("image")]
        public string Image { get; set; }
        [Column("scoreFood")]
        public int ScoreFood { get; set; }
        [Column("scoreService")]
        public int ScoreService { get; set; }
        [Column("scoreAtmosphere")]
        public int ScoreAtmosphere { get; set; }
        [Column("scoreInterier")]
        public int ScoreInterier { get; set; }
    }
}
