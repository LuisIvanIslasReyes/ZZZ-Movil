import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AlertsFilters: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('todas');

  return (
    <View style={styles.container}>
      {/* Filters Header */}
      <View style={styles.filtersHeader}>
        <View style={styles.filtersLeft}>
          <MaterialCommunityIcons name="filter-variant" size={18} color="#6B7280" />
          <Text style={styles.filtersLabel}>Filtros:</Text>
        </View>
        <TouchableOpacity style={styles.markReadButton}>
          <MaterialCommunityIcons name="check-circle-outline" size={18} color="#0F3460" />
          <Text style={styles.markReadText}>Marcar como leídas</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'todas' && styles.tabActive]}
          onPress={() => setSelectedTab('todas')}
        >
          <Text style={[styles.tabText, selectedTab === 'todas' && styles.tabTextActive]}>
            Todas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'criticas' && styles.tabActive]}
          onPress={() => setSelectedTab('criticas')}
        >
          <Text style={[styles.tabText, selectedTab === 'criticas' && styles.tabTextActive]}>
            Críticas
          </Text>
          <View style={styles.tabBadge}>
            <Text style={styles.tabBadgeText}>1</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'advertencias' && styles.tabActive]}
          onPress={() => setSelectedTab('advertencias')}
        >
          <Text style={[styles.tabText, selectedTab === 'advertencias' && styles.tabTextActive]}>
            Advertencias
          </Text>
          <View style={styles.tabBadge}>
            <Text style={styles.tabBadgeText}>2</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'recomendaciones' && styles.tabActive]}
          onPress={() => setSelectedTab('recomendaciones')}
        >
          <Text style={[styles.tabText, selectedTab === 'recomendaciones' && styles.tabTextActive]}>
            Recomendaciones
          </Text>
          <View style={styles.tabBadge}>
            <Text style={styles.tabBadgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filtersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filtersLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filtersLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: 6,
  },
  markReadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  markReadText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F3460',
    marginLeft: 6,
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  tabActive: {
    backgroundColor: '#0F3460',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  tabBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
    paddingHorizontal: 6,
  },
  tabBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F3460',
  },
});

export default AlertsFilters;
