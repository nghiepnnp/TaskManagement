using Newtonsoft.Json;

namespace API2.Models.DTO
{
    public class TaskDto
    {
        [JsonProperty("parent")]
        public int IdParent { get; set; }
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("label")]
        public string Label { get; set; }
        [JsonProperty("type")]
        public string Type { get; set; }
        [JsonProperty("text")]
        public string Name { get; set; }
        [JsonProperty("start_date")]
        public System.DateTime StartDate { get; set; }
        [JsonProperty("end_date")]
        public System.DateTime EndDate { get; set; }
        [JsonProperty("duration")]
        public int Duration { get; set; }
        [JsonProperty("progress")]
        public int Progress { get; set; }
        [JsonIgnore]
        public byte IsUnscheduled { get; set; }
        [JsonProperty("staffId")]
        public int StaffId { get; set; }
    }
}