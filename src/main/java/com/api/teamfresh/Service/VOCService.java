package com.api.teamfresh.Service;

import com.api.teamfresh.Repository.*;
import com.api.teamfresh.dto.CompensationDto;
import com.api.teamfresh.dto.ObjectionDto;
import com.api.teamfresh.dto.VOCDto;
import com.api.teamfresh.entity.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.hibernate.Hibernate;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VOCService {

  private final VOCRepository vocRepository;
  private final CompensationRepository compensationRepository;
  private final PenaltyRepository penaltyRepository;
  private final CarrierRepository carrierRepository;
  private final DriverRepository driverRepository;
  private final CustomerRepository customerRepository;
  private final ObjectionRepository objectionRepository;

  @Autowired
  public VOCService(VOCRepository vocRepository, CompensationRepository compensationRepository,
                    PenaltyRepository penaltyRepository, CarrierRepository carrierRepository,
                    DriverRepository driverRepository, CustomerRepository customerRepository, ObjectionRepository objectionRepository) {
    this.vocRepository = vocRepository;
    this.compensationRepository = compensationRepository;
    this.penaltyRepository = penaltyRepository;
    this.carrierRepository = carrierRepository;
    this.driverRepository = driverRepository;
    this.customerRepository = customerRepository;
    this.objectionRepository = objectionRepository;
  }

  // 모든 VOCs를 가져오는 메서드
  public List<VOC> findAll() {
    return vocRepository.findAllWithJoinFetch();
  }

  // 운송사 또는 고객사에 따라 VOCs를 가져오는 메서드
  public List<VOC> findAllByManagerType(String managerTypeString) {
    ManagerType managerType = ManagerType.valueOf(managerTypeString);
    return vocRepository.findAllWithJoinFetchByManagerType(managerType);
  }


  // 특정 ID의 VOC를 가져오는 메서드
  @Transactional
  public VOC findById(Long id) {
    VOC voc = vocRepository.findById(id).orElse(null);

    if (voc != null && voc.getCustomer() != null) {
      voc.getCustomer().getKeepers().size(); // keepers 컬렉션에 접근하여 초기화
    }

    return voc;
  }

  // VOC를 저장하는 메서드
  @Transactional
  public void submitClaim(VOCDto vocDto) {

    // Transform the DTOs to Entities
    VOC voc = vocDto.toEntity();

    Compensation compensation = null;
    if (vocDto.getCompensation() != null) {
      compensation = vocDto.getCompensation().toEntity();
      compensation.setVoc(voc);  // Compensation 엔터티에 VOC 참조 설정
    }

    Penalty penalty = null;
    if (vocDto.getPenalty() != null) {
      penalty = vocDto.getPenalty().toEntity();
      penalty.setVoc(voc);
      penaltyRepository.save(penalty);
      voc.setPenalty(penalty);
    }

    Objection objection = null;
    if (vocDto.getObjection() != null) {
      objection = vocDto.getObjection().toEntity(voc);  // 수정된 부분: VOC 엔터티 전달
      objectionRepository.save(objection);
    }

    Carrier carrier = null;
    if (vocDto.getCarrier() != null) {
      if (vocDto.getCarrier().getId() != null) {
        carrier = carrierRepository.findById(vocDto.getCarrier().getId()).orElse(null);
      } else if (vocDto.getCarrier().getCarrierType() != null) {
        carrier = new Carrier();
        carrier.setCarrierType(vocDto.getCarrier().getCarrierType());
        carrierRepository.save(carrier);
      }
    }

    Driver driver = null;
    if (vocDto.getDriver() != null) {
      if (vocDto.getDriver().getId() != null) {
        driver = driverRepository.findById(vocDto.getDriver().getId()).orElse(null);
      }
      if (driver == null) {
        driver = vocDto.getDriver().toEntity();
      }
      driver.setCarrier(carrier);
      driverRepository.save(driver);
    }

    Customer customer = null;
    if (vocDto.getCustomer() != null) {
      customer = vocDto.getCustomer().toEntity();
      customerRepository.save(customer);
    }

    // Associate Entities
    voc.setCompensation(compensation);
    voc.setObjection(objection);
    voc.setDriver(driver);
    voc.setCustomer(customer);

    vocRepository.save(voc);
  }

  public List<VOC> findAllWithJoinFetchByManagerType(ManagerType managerType) {
    return vocRepository.findAllWithJoinFetchByManagerType(managerType);
  }


  // 이의제기 입력
  public ObjectionDto.VocResponseDto addObjectionToVoc(ObjectionDto.ObjectionRequest request) {
    // VOC 데이터를 조회
    VOC voc = vocRepository.findById(request.getVocId())
      .orElseThrow(() -> new EntityNotFoundException("VOC not found"));

    // 이의제기 데이터 생성
    Objection objection = request.toEntity(voc);
    objection.setManagerCode(request.getManagerCode()); // 귀책 담당자의 이름 설정

    // 이의제기 데이터 저장
    objectionRepository.save(objection);

    // VOC에 이의제기 데이터 연결 및 저장
    voc.setObjection(objection);
    vocRepository.save(voc);

    // VOC 엔터티를 VocResponseDto로 변환
    return new ObjectionDto.VocResponseDto(voc.getId(), null, new ObjectionDto(objection)); // null을 넣거나 다른 적절한 값을 넣습니다.
  }
//  귀책인정
  @Transactional
  public void updateVerificationStatusToTrue(Long vocId) {
    // vocId를 사용하여 해당 VOC를 조회
    VOC voc = vocRepository.findById(vocId).orElse(null);

    if (voc != null) {
      // VOC를 찾았을 경우 verificationStatus를 true로 설정
      voc.setVerificationStatus(true);

      // 변경된 VOC를 저장
      vocRepository.save(voc);
    } else {
      // VOC를 찾지 못한 경우 예외 처리 또는 다른 로직을 수행할 수 있습니다.
      throw new RuntimeException("VOC not found with ID: " + vocId);
    }
  }

    // 모든 보상(Compensation)을 가져오는 메서드
    @Transactional
    public List<CompensationDto> getAllCompensations() {
      List<Compensation> compensations = findAllCompensations();

      return compensations.stream()
        .filter(compensation -> compensation.getVoc() != null)
        .map(compensation -> {
          CompensationDto dto = new CompensationDto();
          dto.setId(compensation.getId());
          dto.setVocId(compensation.getVoc().getId());
          dto.setCompensationInfo(compensation.getCompensationInfo());
          dto.setCompensationAmount(compensation.getCompensationAmount());
          dto.setCreationDate(compensation.getCreationDate());
          dto.setUpdateDate(compensation.getUpdateDate());
          if (compensation.getVoc() != null) {
            if (compensation.getVoc().getDriver() != null) {
              dto.setDriverType(compensation.getVoc().getDriver().getDriverType());
            }
            if (compensation.getVoc().getCarrier() != null) {
              dto.setCarrierType(compensation.getVoc().getCarrier().getCarrierType());
            }
          }
          return dto;
        })
        .collect(Collectors.toList());
    }

  public List<Compensation> findAllCompensations() {
    return compensationRepository.findAll();
  }


  public Compensation saveCompensation(Compensation compensation) {
    return compensationRepository.save(compensation);
  }
}