using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Comment
{
    public class CreateCommentDto
    {
        [Required]
        [MinLength(5, ErrorMessage = "Title must be less than 5 characters")]
        [MaxLength(300,ErrorMessage ="Title can not be more than 300 characters")]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MinLength(5, ErrorMessage = "Content must be less than 5 characters")]
        [MaxLength(300,ErrorMessage ="Content can not be more than 300 characters")]
        public string Content { get; set; } = string.Empty;
    }
}