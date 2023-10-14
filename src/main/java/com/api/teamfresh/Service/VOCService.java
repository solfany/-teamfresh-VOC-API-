package com.api.teamfresh.Service;

import com.api.teamfresh.Repository.VOCRepository;
import com.api.teamfresh.entity.VOC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VOCService {
    private final VOCRepository vocRepository;

    @Autowired
    public VOCService(VOCRepository vocRepository) {
        this.vocRepository = vocRepository;
    }

    public List<VOC> getAllVOCs() {
        return vocRepository.findAll();
    }

    public VOC createVOC(VOC voc) {
        return vocRepository.save(voc);
    }

    // 패널티, 배상에 대한 CRUD 등 다른 서비스 메소드도 추가...
}