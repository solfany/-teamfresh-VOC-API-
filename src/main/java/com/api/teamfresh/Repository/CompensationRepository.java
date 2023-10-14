package com.api.teamfresh.Repository;

import com.api.teamfresh.entity.Compensation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompensationRepository extends JpaRepository<Compensation, Long> {}
