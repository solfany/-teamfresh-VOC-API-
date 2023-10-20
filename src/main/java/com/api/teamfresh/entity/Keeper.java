package com.api.teamfresh.entity;

import com.api.teamfresh.dto.KeeperDto;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
public class Keeper {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JoinColumn(name = "customer_id")
  private Customer customer;

  private String managerCode; // 고객사 담당자 코드
  private String keeperName; // 이름
  private String phoneNum; // 핸드폰 번호
  @Temporal(TemporalType.DATE)
  private Date creationDate;  // 생성일
  @Temporal(TemporalType.DATE)
  private Date updateDate;  // 수정일

  private int penaltyCount = 0;  // 패널티 카운트

  // In Keeper Entity
  public KeeperDto toDto() {
    KeeperDto dto = new KeeperDto();

    dto.setId(this.id);
    dto.setCustomerId(this.customer != null ? this.customer.getId() : null);
    dto.setManagerCode(this.managerCode);
    dto.setKeeperName(this.keeperName);
    dto.setPhoneNum(this.phoneNum);
    dto.setCreationDate(this.creationDate);
    dto.setUpdateDate(this.updateDate);
    dto.setPenaltyCount(this.penaltyCount);

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

