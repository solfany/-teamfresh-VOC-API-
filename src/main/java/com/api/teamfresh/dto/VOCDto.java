package com.api.teamfresh.dto;

import com.api.teamfresh.entity.ManagerType;
import com.api.teamfresh.entity.VOC;
import lombok.Data;

import java.util.Date;

@Data
public class VOCDto {

  private Long id; // VOC의 고유한 ID
  private String vocContent; // 귀책 당사자.
  private Boolean verificationStatus; // 당사자 확인 여부
  private ManagerType managerType; // 담당사의 타입 (CUSTOMER or DRIVER)
  private ObjectionDto objection; // 이의 제기 정보 DTO (이는 내부적으로 또 다른 DTO가 필요합니다)
  private Date creationDate; // VOC가 생성된 날짜
  private Date updateDate; // VOC 정보 업데이트 날짜
  private CompensationDto compensation; // 배상 정보 DTO
  private PenaltyDto penalty; // 패널티 정보 DTO
  private CarrierDto carrier; // 운송사 DTO
  private CustomerDto customer; // 고객사 DTO
  private DriverDto driver;  // Add this line

  // 기본 생성자, 매개변수 있는 생성자, getter, setter, toString 등의 메서드는 Lombok에 의해 자동으로 생성됩니다.

  public VOC toEntity() {
    VOC voc = new VOC();
    voc.setVocContent(this.vocContent);
    voc.setVerificationStatus(this.verificationStatus);
    voc.setManagerType(this.managerType);

    if (this.objection != null) {
      voc.setObjection(this.objection.toEntity(voc));  // `voc` 인스턴스를 인자로 전달
    }

    if (this.compensation != null) {
      voc.setCompensation(this.compensation.toEntity());
    }

    if (this.penalty != null) {
      voc.setPenalty(this.penalty.toEntity());
    }

    if (this.carrier != null) {
      voc.setCarrier(this.carrier.toEntity());
    }

    if (this.customer != null) {
      voc.setCustomer(this.customer.toEntity());
    }
    if (this.driver != null) {
      voc.setDriver(this.driver.toEntity());
    }

    voc.setCreationDate(this.creationDate);
    voc.setUpdateDate(this.updateDate);

    return voc;
  }
}