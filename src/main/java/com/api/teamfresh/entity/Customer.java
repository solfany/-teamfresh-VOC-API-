package com.api.teamfresh.entity;

import com.api.teamfresh.dto.CustomerDto;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

// 고객사 엔티티
@Data
@Entity
public class Customer {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String customerType; // 고객사 이름
  private String customerCode;  // 고객사 코드
  @Temporal(TemporalType.DATE)
  private Date creationDate;  //생성일
  @Temporal(TemporalType.DATE)
  private Date updateDate;  // 수정일

  @OneToMany(mappedBy = "customer")  //운송사인지 고객사인지
  private List<Keeper> keepers;

  public CustomerDto toDto() {
    CustomerDto dto = new CustomerDto();
    dto.setId(this.id);
    dto.setCustomerType(this.customerType);
    dto.setCustomerCode(this.customerCode);
    dto.setCreationDate(this.creationDate);
    dto.setUpdateDate(this.updateDate);
     dto.setKeepers(this.keepers.stream().map(Keeper::toDto).collect(Collectors.toList())); // 필요하면 추가
    return dto;
  }
  @PrePersist
  protected void onCreate() {
    creationDate = new Date();
    updateDate = creationDate;  // Optionally set updateDate on creation too.
  }

  @PreUpdate
  protected void onUpdate() {
    updateDate = new Date();
  }

}