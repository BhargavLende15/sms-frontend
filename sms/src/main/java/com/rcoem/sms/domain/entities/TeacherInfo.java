package com.rcoem.sms.domain.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity(name = "teacher_info")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeacherInfo {
    @Id
    private String id;
    private String name;
    private String email;
    private String mobileNumber;
    private String department;
    private String gender;
    private String dateOfBirth;
}




