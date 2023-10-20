package com.api.teamfresh.entity;

import com.api.teamfresh.dto.CarrierDto;
import com.api.teamfresh.dto.DriverDto;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
@Data
@Entity
public class Carrier {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String carrierType;
  private String carrierCode;

  @Temporal(TemporalType.DATE)
  private Date creationDate;

  @Temporal(TemporalType.DATE)
  private Date updateDate;

  @OneToMany(mappedBy = "carrier", fetch = FetchType.EAGER)
  private Set<Driver> drivers = new HashSet<>();

  @OneToMany(mappedBy = "carrier", cascade = CascadeType.ALL)
  private List<VOC> vocs; // 이 택배사에 관련된 클레임들

  public CarrierDto toDto() {
    CarrierDto dto = new CarrierDto();
    dto.setId(this.id);
    dto.setCarrierType(this.carrierType);
    dto.setCarrierCode(this.carrierCode);
    dto.setCreationDate(this.creationDate);
    dto.setUpdateDate(this.updateDate);

    if (this.drivers != null && !this.drivers.isEmpty()) {
      dto.setDrivers(this.drivers.stream().map(Driver::toDto).collect(Collectors.toSet()));
    }
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
